var employees = [];

const EMPTY_RECORD = {
  id: '',
  name: '',
  email: '',
  department: ''
};

const MAIN = "/";

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
        this.employee = res.data;
      })
      .catch(console.log);
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
        this.employee = res.data;
      })
      .catch(console.log);
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

      axios.post("api/employee",{
        id: Math.random().toString().split('.')[1],
        name: employee.name,
        email: employee.email,
        department: employee.department
      })
      .then((res) => {
        router.push(MAIN);
      })
      .catch(console.log);
    }
  }
});

var router = new VueRouter({
	routes: [
		{path: '/', component: List},
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
