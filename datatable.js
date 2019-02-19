import getPhones from './server.js'

export default class DataTable {
    constructor({ element, pathPhones, columnConfig }) {
      this._element = element;
      this._columnConfig = columnConfig;
      this._pahtPhones = pathPhones;
      this._searchPhones = {};
      this._statePhoneInTable = {};
      this._nameClassStateSort = 'title_a';
      this._searchSymbols = '';

      this.getPhones(this._pahtPhones);

        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-issortable]')) {
                this._sort(event);
            }
            if (event.target.closest('[data-checkbox]')) {
                this._setCheckbox(event);
            }
        });
        document.addEventListener('input', (event) => {
            if (event.target.closest('[data-search]')) {
                this._search(event);
                this._render();
            }
        });
    }

   getPhones(path) {
    fetch(path).then((response) => {
      if (response.status !== 200) {
        alert('error');
        return
      }
      return response.json();
    })
      .then((phones) => {
        //this._defaultItems = phones;
        this._statePhoneInTable = phones;
        this._render();
      })
      .catch(alert);
  }

  _render() {
    this._search();
    //console.log(this._searchPhones)
   
    let string = `<table><tbody><tr><th><input type="checkbox" data-checkbox="global"></th>`;
    Object.keys(this._columnConfig).map((conf) => string += `<th
        data-issortable="${(this._columnConfig[conf].issortable) === true}"
        data-issearchable="${(this._columnConfig[conf].issearchable) === true}"
        data-name="${conf}"
        class="${this._nameClassStateSort}"
    >${this._columnConfig[conf].title}</th>` );
    string += `</tr>`;

    Object.keys(this._searchPhones).map(elem => {
        string += '<tr><td><input type="checkbox" data-checkbox checked></td>';
        Object.keys(this._columnConfig).map(el => string += `<td>${this._searchPhones[elem][el]}</td>`);
        string += '</tr>';
    });
    string += '</tr></tbody></table>';
    this._element.innerHTML = string;
  }

  _setCheckbox() {
    if (event.target.dataset.checkbox === 'global') {
        if (event.target.checked === true) {
            let arrtd = datatable.getElementsByTagName("tr");
            arrtd[1].children[0].checked = false;
        } else {
            let arrtd = datatable.getElementsByTagName("tr");
        }
    }
}


  _sort() {
     
    let indexSort1 = -1;
    let indexSort2 = 1;
    let nameField = event.target.dataset.name;
    if (event.target.dataset.issortable === 'true') { //можна ли сортировать
        //console.log(event.target)
        //console.dir(event.target)
    
        if (event.target.classList.contains('title_a')) {
            this._nameClassStateSort = 'title_s';
            indexSort1 = -1;
            indexSort2 = 1;
            event.target.classList.remove('title_a');
            event.target.classList.add('title_s');

        } else {
            this._nameClassStateSort = 'title_a';
            indexSort1 = 1;
            indexSort2 = -1;
            event.target.classList.remove('title_s');
            event.target.classList.add('title_a');
        }
        this._statePhoneInTable.sort((a, b) => {
            if (a[nameField] < b[nameField]) return indexSort1;
            if (a[nameField] > b[nameField]) return indexSort2;
            return 0;
        });
    }
    
    this._render();
}

    _search() {
        [...this._searchPhones] = this._statePhoneInTable;
       // console.log( this._searchPhones)
        let input = document.querySelector('[data-search]');
        //if (!input) return;

        this._searchPhones = [];
        let arrNameSearch = [];
        let count = 0;
        for (let key in this._columnConfig) {
            if (this._columnConfig[key]['issearchable']) {
                arrNameSearch.push(key)
            }
        }

      
            for (let i = 0; i < this._statePhoneInTable.length; i++) {
                let element = this._statePhoneInTable[i];
                count = 0;
                    for (let i = 0; i < arrNameSearch.length; i++) {
                        let x = element[arrNameSearch[i]].indexOf(input.value);
                        if (x >= 0) {
                             count++;
                            console.log(element[arrNameSearch[i]].indexOf(input.value))
                            console.log(input.value)
                        }
                    }
                    
                    if (count > 0) {
                        this._searchPhones.push(element);
                        //console.log('addfdfdssdfdf')
                    }
                   
            
        }
        
      

        
    }
}
