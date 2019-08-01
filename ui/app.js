var employees = [
  {id: 1, name: 'Angular', email: 'Superheroic JavaScript MVW Framework.', department: "Mobile"},
  {id: 2, name: 'Ember', email: 'A framework for creating ambitious web applications.', department: "Architecture"},
  {id: 3, name: 'React', email: 'A JavaScript Library for building user interfaces.', department: "ecomerce"}
];

const EMPTY_RECORD = {
  id: '',
  name: '',
  email: '',
  department: ''
};

const MAIN = "/list";
var apitoken;

function findEmployee (employeeId) {
  return employees[findEmployeeKey(employeeId)];
};

function findEmployeeKey (employeeId) {
  for (var key = 0; key < employees.length; key++) {
    if (employees[key].id == employeeId) {
      return key;
    }
  }
};

var Login = Vue.extend({
  template: '#login',
  data: function() {
    return {
      note: "",
      user: {
        name: "",
        pass: ""
      }
    };
  },
  watch: {
    note() {
      const note = document.querySelector('.note');
      if (this.note.length) {
        note.classList.add('note--up');
      } else {
        note.classList.remove('note--up');
        note.classList.add('note--down');
      }
    }
  },
  methods: {
    makeAuth(e) {
      let self = this;
      let basic = base64.encode(this.user.name + ":" + this.user.pass);

      axios.post("api/login", {
        headers : {
          "Authorization": "Basic " + basic
        }
      })
      .then((res) => {
        console.log(res.data);
        apitoken = res.data.apitoken;
        router.push(MAIN);
      })
      .catch((err) => {
        self.note = 'Login failed';
      });
    },
    inputFocus() {
      this.note = '';
    }
  }
});

var List = Vue.extend({
  template: '#employee-list',
  data: function () {
    return {
      employees: employees,
      searchKey: ''
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter( (employee) => {
      	return employee.name.indexOf(this.searchKey) > -1
      })
    }
  },
  mounted() {
    axios.get("api/employee")
      .then((res) => {
        this.employees = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

var Employee = Vue.extend({
  template: '#employee',
  data: function () {
    return {
      //employee: findEmployee(this.$route.params.employee_id)
      employee: {
        id: '',
        name: '',
        email: '',
        department: ''
      }
    };
  },
  mounted() {
    axios.get("api/employee/" + this.$route.params.employee_id)
      .then((res) => {
        console.log(res);
        this.employee = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

var EmployeeEdit = Vue.extend({
  template: '#employee-edit',
  data: function () {
    return {
      employee: {
        name: '',
        email: '',
        department: ''
      }
    };
  },
  methods: {
    updateEmployee: function () {
      let employee = this.employee;
      /*
      employees[findEmployeeKey(employee.id)] = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        department: employee.department
      };
      */
      axios.put("api/employee", {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        department: employee.department
      })
      .then((res) => {

        router.push(MAIN);
      })
      .catch(console.log);
    }
  },
  mounted() {
    axios.get("api/employee/" + this.$route.params.employee_id)
      .then((res) => {
        console.log(res);
        this.employee = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

var EmployeeDelete = Vue.extend({
  template: '#employee-delete',
  data: function () {
    return {
      employee: {
        name: '',
        email: '',
        department: ''
      }
    };
  },
  methods: {
    deleteEmployee: function () {
      axios.delete("api/employee/" + this.$route.params.employee_id)
        .then((res) => {
          router.push(MAIN);
        })
        .catch(console.log);
    }
  },
  mounted() {
    axios.get("api/employee/" + this.$route.params.employee_id)
      .then((res) => {
        console.log(res);
        this.employee = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

var AddEmployee = Vue.extend({
  template: '#add-employee',
  data: function () {
    return {
      employee: {
        name: '',
        email: '',
        department: ''
      }
    }
  },
  methods: {
    createEmployee: function() {
      let employee = this.employee;

      axios.post("/api/employee",{
        id: Math.random().toString().split('.')[1],
        name: employee.name,
        email: employee.email,
        department: employee.department
      })
      .then((res) => {
        router.push(MAIN);
      });
    }
  }
});

var router = new VueRouter({
	routes: [
    {path: '/', component: Login},
		{path: MAIN, component: List},
		{path: '/employee/:employee_id', component: Employee, name: 'employee'},
		{path: '/add-employee', component: AddEmployee},
		{path: '/employee/:employee_id/edit', component: EmployeeEdit, name: 'employee-edit'},
		{path: '/employee/:employee_id/delete', component: EmployeeDelete, name: 'employee-delete'}
	]
});


var App = {}

new Vue({
  router
}).$mount('#app')
