import React from "react";
import Filter from "./Filter";
import Table from "./Table";
import Pagination from "./Pagination";
import './App.css';


class App extends React.Component {
  columnConfig = {
    name: {
      title: 'Название', 
      isSortable: true, 
      isSearchable: true,
    },
    age: {
      title: 'Возраст',
      isSortable: true, 
    },
    snippet: { 
      title: 'Описание',
      isSortable: true,
      isSearchable: false, 
    }
  }
  
  state = {
    getPhones: [],
    phones: [],
    value: "",
    bySort: true,
    checkGlobal: false,
    fragment: '',
    quantityInPage: 3,
    curentPage: 0,
  };

  curentPage = 0;
  showPage = 1;

  async componentDidMount() {
    const response = await fetch(
      "https://mate-academy.github.io/phone-catalogue-static/phones/phones.json"
    );
    const phones = await response.json();
    this.setState({
      phones: phones.map(el => {
        return { ...el, check: false, visible: true, visibleTexarea: true };
      })
    });
  }

  render() {
    const phones = this.visible();
    return (
      <div className="Content">
        <h3 className="Datatable">Datatable</h3>
        
        <select onChange={(event) => {
          this.SetcountViewPages( +event.target.value)}}>
          <option>3</option>
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <Pagination 
          focus={this.showPage} 
          setPagination={this.setPagination} 
          quantityPage={this.curentPage}
        />
        <Filter onchange={this.filter} phones={ phones } />
        <Table 
          blur={this.blur}
          twoclick={this.editField}
          check={this.state.checkGlobal}
          setcheckg={this.setCheckGlobal} 
          setcheck={this.setcheck} 
          columnConfig={this.columnConfig} 
          onclick={this.sort} 
          phones={phones} 
        />
        <Pagination 
          focus={this.showPage} 
          setPagination={this.setPagination} 
          quantityPage={this.curentPage}
        />
      </div>
    );
  }

  SetcountViewPages = (count) => {
    this.curentPage = 0;
    this.setState({ quantityInPage: count } )
  }

  setPagination = (number) => { 
      this.curentPage = number;
      this.setState({ curentPage: number })
  }

  visible = () => {
    if (!this.state.phones.length) return [];

    let visiblePhone = [...this.state.phones];
    let pagin = visiblePhone.filter(el => el.visible === true);
    
    this.showPage = Math.ceil(pagin.length / this.state.quantityInPage);
    
    return this.slicePaginator(pagin, this.state.quantityInPage)  
  }

  slicePaginator = (arr, n) => {
    let i, j, tmp = [];
    for (i = 0, j = arr.length; i < j; i += n) {
      tmp.push(arr.slice(i, i + n));
    }
    return tmp[this.curentPage] ? tmp[this.curentPage] : tmp;
  }

  filter = value => {
    this.curentPage = 0;
    const colParam = Object.keys(this.columnConfig)
    let filterPhone = [...this.state.phones];
    
    for (let i = 0; i < colParam.length; i++) {
      if (!this.columnConfig[colParam[i]].isSearchable) continue;

      filterPhone.map((el, index) => {
        return el[colParam[i]].toLowerCase().indexOf(value) >= 0
          ? (filterPhone[index].visible = true)
          : (filterPhone[index].visible = false);  
      });
    }
    this.setState({ value, phones: filterPhone })
  };

   editField = (name, id, fragment) => {
     let phones = [...this.state.phones];
     let index = phones.findIndex(el => el.id === id);
     
     phones[index][name] = (
      <textarea 
        autoFocus
        onKeyDown={(event) => {
          if (event.keyCode === 27) this.blur(event.target.value, name, index, event.keyCode);
          if (event.keyCode === 13) this.blur(event.target.value, name, index, event.keyCode);
          }
        }
        className="Textarea"
        onBlur={(event) => this.blur(event.target.value, name, index) }
        defaultValue={phones[index][name]} hidden={false}>
      </textarea>
      );
     this.setState({ phones, fragment });
   }

   blur = (value, name, id, keyCode) => {
    if (keyCode === 27) value = this.state.fragment;

    let phones = [...this.state.phones];
    phones[id][name] = value;
    this.setState({ phones })
   }

  sort = (parSort) => {
    if (!this.columnConfig[parSort].isSortable) return;
    const bySort = this.state.bySort;

    let phones = [...this.state.phones];
    const phoneSort = phones.sort(function(a, b) {
      let namea = a[parSort]
      let  nameb = b[parSort]
      if (namea > nameb) return bySort ? 1 : -1;
      if (namea < nameb) return bySort ? -1 : 1;
      return 0;
    });
   
    this.setState({ phones: phoneSort, bySort: !bySort });
  }

  setCheckGlobal = () => {
    let phones = [...this.state.phones];
    const check = !this.state.checkGlobal;
    phones.map((el, i) => el.visible === true ? phones[i].check = check : '')

    this.setState({ checkGlobal: check, phones })
  }

  setcheck = (phone) => {
    let selectPhone = [...this.state.phones];
    selectPhone.map((el, i) => selectPhone[i].id === phone.id 
      ? selectPhone[i].check = !selectPhone[i].check 
      : selectPhone[i].check);

    let countTrue = 0;
    let arrPhones = this.visible();
    arrPhones.map(el => el.check === true ? countTrue++ : '');
    let bool = countTrue === arrPhones.length  ? true : false;
    
    this.setState({ phones: selectPhone, checkGlobal: bool })
  }
}

export default App;
