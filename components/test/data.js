export const CandidateData = [
  {
    id: 1,
    status: "No Response",
    candidates: 15,
  },
  {
    id: 2,
    status: "Inactive",
    candidates: 25,
  },
  {
    id: 3,
    status: "Response Recieved",
    candidates: 25,
  },
  {
    id: 4,
    status: "Interviewed",
    candidates: 5,
  },
  {
    id: 5,
    status: "Interview Scheduled",
    candidates: 50,
  },
];


const generateRandomData = () => {
  return ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map(() => Math.floor(Math.random() * 50)  );
};

export const LineChartdata = {
  labels:['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
        label: 'No Response',
        data: generateRandomData(),
        borderColor: '#CBCBCB',
        backgroundColor: '#CBCBCB',
        // pointRadius: 3
    },
    {
        label: 'Inactive',
        data: generateRandomData(),
        borderColor: '#E97C7C',
        backgroundColor: '#E97C7C',
    },
    {
        label: 'Response Received',
        data: generateRandomData(),
        borderColor: '#85B8EB',
        backgroundColor: '#85B8EB',
    },
    {
        label: 'Interviewed',
        data: generateRandomData(),
        borderColor: '#87D0A5',
        backgroundColor: '#87D0A5',
    },
    {
        label: 'Interview Scheduled',
        data: generateRandomData(),
        borderColor: '#FFE183',
        backgroundColor: '#FFE183',
    } 
  ],
};

// https://dp2noypyesjes.cloudfront.net/assets/index-670d23c2.js

// (function (window, document, scriptTagName, scriptAddress, globalName, scriptElement, otherScriptElement) {
//   // store the name of the global variable
//   // Create a new div element
//   var rootDiv = document.createElement('div');
//   rootDiv.id = 'root';

//   // Append the div element to the document's body or another desired location
//   document.body.appendChild(rootDiv);


//   // dynamically create a script tag element with async execution,
//   scriptElement = document.createElement(scriptTagName);
//   otherScriptElement = document.getElementsByTagName(scriptTagName)[0];
//   scriptElement.async = 1; // it is just a shorter version of `true`
//   scriptElement.src = scriptAddress;

//   // inject the script tag before first script tag found within document
//   otherScriptElement.parentNode.insertBefore(scriptElement, otherScriptElement);
// })(window, document, 'script', 'https://dp2noypyesjes.cloudfront.net/assets/index-670d23c2.js', 'ga');
