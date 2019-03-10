import React from "react";

const Table = ({ phones, onclick, columnConfig, setcheck, setcheckg, check, twoclick }) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th><input onChange={() => setcheckg()} type="checkbox" checked={check} /></th>
              {Object.keys(columnConfig).map(el =>  (
              <th 
                className="sort" 
                key={el} onClick={() => onclick(el)}
              >
                {columnConfig[el].title}
              </th>) )}
          </tr>
          {phones.map((phone) => {
            return (
              <tr key={phone.age}>
                <td><input onChange={() => setcheck(phone)} type="checkbox" checked={phone.check} /></td>
                {Object.keys(columnConfig).map(el =>  (
                    <td
                      onDoubleClick={() => twoclick(el, phone.id, phone[el])} 
                      key={el}
                      >
                      {phone[el]}
                    </td>) )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
