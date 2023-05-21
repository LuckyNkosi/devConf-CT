const testEndpoint = 'http://localhost:3000/testSite';

const url = document.querySelector('#site');
const resultsBody = document.querySelector('#resultsTableBody');

const loader = document.querySelector('#loader');
const error = document.querySelector('#error');

const showElement = (element) => {
    element.classList.remove('hidden');
}
const hideElement = (element) => {
    element.classList.add('hidden');
}
const handleError = (response) => {
    if (!response.ok) {
        showElement(error);
        hideElement(loader);
        console.error(response.statusText);
    }
    return response;
}
const createTableRow = (result) => {
    const tr = document.createElement('tr');
    const cols = ['code', 'type', 'message', 'context'];
    cols.forEach(col => {
        const td = document.createElement('td');
        td.innerText = result[col];
        tr.appendChild(td);
    });
    tr.classList.add(result.type);
    return tr;
}

const testSite = async () => {
    url.checkValidity();
    url.reportValidity();

    if (!url.validity.valid)
        return;

    resultsBody.innerHTML = '';
    showElement(loader);
    hideElement(error);

    const response = await fetch(`${testEndpoint}?url=${url.value}`).catch(handleError);
    const result = await response.json().catch(handleError);

    hideElement(loader);
    result.issues.forEach(r => {
        const tr = createTableRow(r);
        resultsBody.appendChild(tr);
    });
}