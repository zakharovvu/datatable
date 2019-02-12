import DataTable from './datatable.js';

new DataTable({
    element: document.querySelector('#datatable'),
    pathPhones: 'https://mate-academy.github.io/phone-catalogue-static/phones/phones.json',
   
    columnConfig: {
      name: {
        title: 'Название',
        issortable: true,
        issearchable: true,
      },
      age: {
        title: 'Возраст',
        issortable: true,
      },
      snippet: {
        title: 'Описание',
        issearchable: true,
      },
      imageUrl: {
        title: 'Url',
        hasImage: true
      }, 
    }
});