var employees = [
  {id: 1, name: 'Angular', email: 'Superheroic JavaScript MVW Framework.', department: "Mobile"},
  {id: 2, name: 'Ember', email: 'A framework for creating ambitious web applications.', department: "Architecture"},
  {id: 3, name: 'React', email: 'A JavaScript Library for building user interfaces.', department: "ecomerce"}
];

const MAIN = "/list";

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
    return {note: ""};
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
      // write you own auth logic here
      router.push(MAIN);
      this.note = 'Login failed';
    },
    inputFocus() {
      this.note = '';
    }
  }
});

var List = Vue.extend({
  template: '#employee-list',
  data: function () {
    return {employees: employees, searchKey: ''};
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter( (employee) => {
      	return employee.name.indexOf(this.searchKey) > -1
        //return !employee.name.indexOf(this.searchKey)
      })
    }
  }
});

var Employee = Vue.extend({
  template: '#employee',
  data: function () {
    return {employee: findEmployee(this.$route.params.employee_id)};
  }
});

var EmployeeEdit = Vue.extend({
  template: '#employee-edit',
  data: function () {
    return {employee: findEmployee(this.$route.params.employee_id)};
  },
  methods: {
    updateEmployee: function () {
      //Obsolete, employee is available directly from data...
      let employee = this.employee; //var employee = this.$get('employee');
      employees[findEmployeeKey(employee.id)] = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        department: employee.department
      };
      router.push(MAIN);
    }
  }
});

var EmployeeDelete = Vue.extend({
  template: '#employee-delete',
  data: function () {
    return {employee: findEmployee(this.$route.params.employee_id)};
  },
  methods: {
    deleteEmployee: function () {
      employees.splice(findEmployeeKey(this.$route.params.employee_id), 1);
      router.push(MAIN);
    }
  }
});

var AddEmployee = Vue.extend({
  template: '#add-employee',
  data: function () {
    return {employee: {name: '', email: '', department: ''}
    }
  },
  methods: {
    createEmployee: function() {
      //Obsolete, employee is available directly from data...
      let employee = this.employee; //var employee = this.$get('employee');
      employees.push({
        id: Math.random().toString().split('.')[1],
        name: employee.name,
        email: employee.email,
        department: employee.department
      });
      router.push(MAIN);
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
