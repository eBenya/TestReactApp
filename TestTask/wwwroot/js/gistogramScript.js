function mapUser(userData) {
    userData.map(i => ({
        id: i.userId,
        lifeTime: Math.abs(((new Date(i.dateRegistration)
            - new Date(i.dateLastActivity)) / 1000 / 60 / 60 / 24))
    }))
}

var users = mapUser();

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: users.map(i => 'user' + i.id),
        datasets: [{
            label: 'lifeCycle',
            data: users.map(i => i.lifeTime == 0 ? 1 : i.lifeTime),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});