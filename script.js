// Dados dos pelotões
const grupos = {
    'Primeiro Pelotão': {
        dataBase: new Date(Date.UTC(2025, 2, 10)), // 10 de março de 2025 (Março = 2)
        ciclo: ['Trabalha durante o dia', 'Trabalha durante a noite', 'Primeiro dia de folga', 'Segundo dia de folga', 'Terceiro dia de folga']
    },
    'Segundo Pelotão': {
        dataBase: new Date(Date.UTC(2025, 2, 11)), // 11 de março de 2025
        ciclo: ['Trabalha durante o dia', 'Trabalha durante a noite', 'Primeiro dia de folga', 'Segundo dia de folga', 'Terceiro dia de folga']
    },
    'Terceiro Pelotão': {
        dataBase: new Date(Date.UTC(2025, 2, 12)), // 12 de março de 2025
        ciclo: ['Trabalha durante o dia', 'Trabalha durante a noite', 'Primeiro dia de folga', 'Segundo dia de folga', 'Terceiro dia de folga']
    },
    'Quinto Pelotão': {
        dataBase: new Date(Date.UTC(2025, 2, 13)), // 13 de março de 2025
        ciclo: ['Trabalha durante o dia', 'Trabalha durante a noite', 'Primeiro dia de folga', 'Segundo dia de folga', 'Terceiro dia de folga']
    },
    'Sexto Pelotão': {
        dataBase: new Date(Date.UTC(2025, 2, 14)), // 14 de março de 2025
        ciclo: ['Trabalha durante o dia', 'Trabalha durante a noite', 'Primeiro dia de folga', 'Segundo dia de folga', 'Terceiro dia de folga']
    }
};

// Função para calcular o status do pelotão em uma data específica
function calcularStatus(dataBase, data, ciclo) {
    const diffTime = Math.abs(data - dataBase);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const cicloIndex = diffDays % ciclo.length;
    return ciclo[cicloIndex];
}

// Função para obter a cor com base no status
function getStatusColor(status) {
    if (status === 'Trabalha durante o dia') return 'bg-yellow-400 text-yellow-900';
    if (status === 'Trabalha durante a noite') return 'bg-black text-white';
    if (status === 'Primeiro dia de folga') return 'bg-green-400 text-green-950';
    if (status === 'Segundo dia de folga') return 'bg-green-200 text-green-800';
    if (status === 'Terceiro dia de folga') return 'bg-red-400 text-red-900';
    return 'bg-gray-100 text-gray-800';
}

// Atualiza as escalas diárias com base na data selecionada
function updateEscalas(selectedDate) {
    const escalasDiv = document.getElementById('escalas');
    escalasDiv.classList.add('fade-out'); // Adiciona classe para fade-out
    setTimeout(() => {
        escalasDiv.innerHTML = ''; // Limpa o conteúdo após a animação
        escalasDiv.classList.remove('fade-out'); // Remove fade-out
        const dateInfo = document.getElementById('dateInfo');
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const dataFormatada = selectedDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        dateInfo.textContent = `${diasSemana[selectedDate.getUTCDay()]} - ${dataFormatada}`;
        for (const [grupo, config] of Object.entries(grupos)) {
            let status = calcularStatus(config.dataBase, selectedDate, config.ciclo);
            const div = document.createElement('div');
            div.className = 'flex items-center justify-between p-4 rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:shadow-lg scale-hover fade-in';
            div.innerHTML = `
                <div class="font-medium text-lg">${grupo}</div>
                <div class="px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(status)}">
                    ${status}
                </div>
            `;
            escalasDiv.appendChild(div);
        }
    }, 300); // Aguarda o tempo da animação fade-out
}

// Evento para atualizar as escalas quando a data é alterada
const dateInput = document.getElementById('dateInput');
dateInput.valueAsDate = new Date();
updateEscalas(new Date());
dateInput.addEventListener('change', (e) => {
    const selectedDate = new Date(e.target.value + "T00:00:00Z");
    updateEscalas(selectedDate);
    highlightCalendarDays(selectedDate);
});

// Função para obter o nome do mês
function getMonthName(month) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames[month];
}

// Função para obter a cor do calendário com base no status
function getCalendarStatusColor(status) {
    if (status === 'Trabalha durante o dia') return 'bg-yellow-300 text-yellow-900';
    if (status === 'Trabalha durante a noite') return 'bg-indigo-500 text-white';
    return 'bg-gray-200 text-gray-800';
}

// Cria um calendário para cada pelotão
function createCalendarForPelotao(pelotao, currentMonth, currentYear) {
    const calendarDiv = document.createElement('div');
    calendarDiv.className = 'bg-white rounded-3xl shadow-2xl p-8 fade-in';
    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold text-gray-800 mb-8 active-pelotao';
    title.textContent = `Calendário do ${pelotao}`;
    calendarDiv.appendChild(title);

    const controls = document.createElement('div');
    controls.className = 'flex justify-between items-center mb-8';

    const prevButton = document.createElement('button');
    prevButton.className = 'flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg px-4 py-2 transition duration-300';
    prevButton.innerHTML = '<i class="fas fa-chevron-left text-lg"></i><span>Mês Anterior</span>';
    controls.appendChild(prevButton);

    const monthDisplay = document.createElement('div');
    monthDisplay.className = 'text-xl font-semibold text-gray-700';
    monthDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    controls.appendChild(monthDisplay);

    const nextButton = document.createElement('button');
    nextButton.className = 'flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg px-4 py-2 transition duration-300';
    nextButton.innerHTML = '<span>Próximo Mês</span><i class="fas fa-chevron-right text-lg"></i>';
    controls.appendChild(nextButton);

    calendarDiv.appendChild(controls);

    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'grid grid-cols-7 gap-2 text-center font-medium mb-4';
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'text-gray-700 font-semibold';
        dayDiv.textContent = day;
        calendarGrid.appendChild(dayDiv);
    });
    calendarDiv.appendChild(calendarGrid);

    const calendar = document.createElement('div');
    calendar.className = 'grid grid-cols-7 gap-2';
    calendarDiv.appendChild(calendar);

    function updateCalendar() {
        calendar.innerHTML = '';
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const firstDayIndex = firstDay.getDay();

        for (let i = 0; i < firstDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'h-16 border rounded-lg bg-gray-50';
            calendar.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            const date = new Date(Date.UTC(currentYear, currentMonth, day));
            const status = calcularStatus(grupos[pelotao].dataBase, date, grupos[pelotao].ciclo);
            const dayCell = document.createElement('div');
            const isWorkDay = status === 'Trabalha durante o dia' || status === 'Trabalha durante a noite';
            const statusLabel = status === 'Trabalha durante o dia' ? 'Dia' :
                              status === 'Trabalha durante a noite' ? 'Noite' : 'Folga';
            dayCell.className = `h-16 border rounded-lg flex flex-col items-center justify-center ${getCalendarStatusColor(status)} transition duration-300 hover:scale-105`;
            const dayNumber = document.createElement('div');
            dayNumber.className = 'text-lg font-bold';
            dayNumber.textContent = day;
            const statusText = document.createElement('div');
            statusText.className = 'text-xs font-medium';
            statusText.textContent = statusLabel;
            dayCell.appendChild(dayNumber);
            dayCell.appendChild(statusText);
            calendar.appendChild(dayCell);
        }
    }

    prevButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        monthDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        updateCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        monthDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        updateCalendar();
    });

    updateCalendar();
    return calendarDiv;
}

// Destaca os dias no calendário com base na data selecionada
function highlightCalendarDays(selectedDate) {
    const calendars = document.querySelectorAll('#calendars .grid.grid-cols-7 > div');
    calendars.forEach(dayCell => {
        dayCell.classList.remove('highlight'); // Remove destaque anterior
    });

    const selectedDay = selectedDate.getDate();
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    calendars.forEach(dayCell => {
        const dayNumber = parseInt(dayCell.querySelector('.text-lg')?.textContent, 10);
        const monthDisplay = document.querySelector('#calendars .text-xl.font-semibold');
        const [monthName, year] = monthDisplay.textContent.split(' ');
        const currentMonth = getMonthNameIndex(monthName);
        const currentYear = parseInt(year, 10);

        if (dayNumber === selectedDay && currentMonth === selectedMonth && currentYear === selectedYear) {
            dayCell.classList.add('highlight'); // Adiciona destaque
        }
    });
}

// Obtém o índice do mês pelo nome
function getMonthNameIndex(monthName) {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames.indexOf(monthName);
}

// Gera os calendários para todos os pelotões
const calendarsContainer = document.getElementById('calendars');
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
for (const pelotao in grupos) {
    calendarsContainer.appendChild(createCalendarForPelotao(pelotao, currentMonth, currentYear));
}

// Botão para alternar visibilidade dos integrantes
document.getElementById('toggleMembers').addEventListener('click', () => {
    const membersList = document.getElementById('membersList');
    const toggleButton = document.getElementById('toggleMembers');
    if (membersList.classList.contains('hidden')) {
        membersList.classList.remove('hidden');
        toggleButton.textContent = 'Ocultar Integrantes';
    } else {
        membersList.classList.add('hidden');
        toggleButton.textContent = 'Mostrar Integrantes';
    }
});

// Funções para salvar e carregar dados no localStorage
function saveHoursData(year, month, data) {
    const key = `hoursData-${year}-${month}`;
    localStorage.setItem(key, JSON.stringify(data));
}

function loadHoursData(year, month) {
    const key = `hoursData-${year}-${month}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Atualiza a lista de registros na tela
function updateHourList() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const data = loadHoursData(year, month);
    const hourList = document.getElementById('hourList');
    hourList.innerHTML = ''; // Limpa a lista antes de atualizar

    if (data.length === 0) {
        hourList.innerHTML = '<li>Nenhum registro encontrado.</li>';
        return;
    }

    data.forEach((record, index) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${record.date} às ${record.time} - ${record.type}: ${record.amount} horas`;

        const editBtn = document.createElement('button');
        editBtn.textContent = "Editar";
        editBtn.className = "ml-4 text-blue-500 hover:text-blue-700";
        editBtn.onclick = () => editRecord(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Excluir";
        deleteBtn.className = "ml-4 text-red-500 hover:text-red-700";
        deleteBtn.onclick = () => deleteRecord(index);

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        hourList.appendChild(li);
    });

    // Calcula o total de horas extras e VD mensais
    const totalExtra = data
        .filter(record => record.type === 'Hora Extra')
        .reduce((acc, record) => acc + record.amount, 0);
    const totalVD = data
        .filter(record => record.type === 'VD')
        .reduce((acc, record) => acc + record.amount, 0);

    document.getElementById('summaryExtraMonthly').textContent = `Horas Extras: ${totalExtra.toFixed(1)} horas`;
    document.getElementById('summaryVDMonthly').textContent = `Horas VD: ${totalVD.toFixed(1)} horas`;
}

// Evento para registrar horas
document.addEventListener('DOMContentLoaded', () => {
    const hourSection = document.getElementById('hourSection');
    if (!hourSection) {
        console.error('Seção de Registro de Horas Extras e VD não encontrada.');
        return;
    }

    document.getElementById('hourForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const hourType = document.getElementById('hourType').value;
        const hourDate = document.getElementById('hourDate').value;
        const hourTime = document.getElementById('hourTime').value;
        const hourAmount = parseFloat(document.getElementById('hourAmount').value);

        if (!hourType || !hourDate || !hourTime || isNaN(hourAmount) || hourAmount <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const [year, month] = hourDate.split('-').map(Number);
        const record = {
            date: hourDate,
            time: hourTime,
            type: hourType === 'extra' ? 'Hora Extra' : 'VD',
            amount: hourAmount
        };

        let data = loadHoursData(year, month - 1); // Mês no JavaScript é baseado em zero
        data.push(record); // Adiciona o novo registro à lista
        saveHoursData(year, month - 1, data);
        updateHourList();
        document.getElementById('hourForm').reset();
    });

    // Inicializa a Lista ao Carregar a Página
    updateHourList();
});

// Função para editar um registro
function editRecord(index) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    let data = loadHoursData(year, month);
    const record = data[index];

    document.getElementById('hourType').value = record.type === 'Hora Extra' ? 'extra' : 'vd';
    document.getElementById('hourDate').value = record.date;
    document.getElementById('hourTime').value = record.time;
    document.getElementById('hourAmount').value = record.amount;

    // Remove o registro original
    data.splice(index, 1);
    saveHoursData(year, month, data);
    updateHourList();
}

// Função para excluir um registro
function deleteRecord(index) {
    if (confirm("Tem certeza que deseja excluir este registro?")) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        let data = loadHoursData(year, month);
        data.splice(index, 1);
        saveHoursData(year, month, data);
        updateHourList();
    }
}