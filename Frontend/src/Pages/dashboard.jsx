import React,{useState} from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut  } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin
import '../Diseño/tabla.css';

export const Dash = ({ListParms}) => {

    if (!ListParms || !ListParms.ListDatos) {
      return null;
    };

    const generateRandomColor = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.6)`;
    };
    const data = {
      labels: ListParms.ListTable.map(dato => dato.name+ " - " + dato.pid), // Agregamos más datos a cada etiqueta
      datasets: [
        {
          data: ListParms.ListDatos,
          backgroundColor: ListParms.ListaPid.map(() => generateRandomColor())
        },
      ],
    };

    const opciones = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          legend: {
              position: 'bottom',
          },
          title: {
              display: true,
              text: 'Chart.js Doughnut Chart'
          },
          datalabels: { // Configuración del plugin datalabels
              formatter: (value, ctx) => { // Formateador para personalizar los datos en cada segmento
                  let label = ctx.chart.data.labels[ctx.dataIndex]; // Obtiene el label del segmento
                
                  return label;
              },
              color: 'black', // Color del texto
              display: 'auto' // Muestra el valor en todos los segmentos
          }
      }
    };
    return (
        <div style ={{display: 'flex' }}>
            <div style={{ width: '500px', height: '500px' }}>
                <Doughnut data={data}  options={opciones} plugins={[ChartDataLabels]}  />
            </div>
            <div className="tabla-container">
                <table className="tabla">
                    <thead>
                    <tr>
                        <th>PID</th>
                        <th>Nombre</th>
                        <th colSpan="2">Memoria</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ListParms.ListTable.map((dato) => (
                        <tr key={dato.pid}>
                        <td>{dato.pid}</td>
                        <td>{dato.name}</td>
                        <td>{dato.memoria}KB</td>
                        <td>{dato.cpu}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
  };
