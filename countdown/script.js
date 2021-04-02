const days = document.getElementById('days')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')

function countdown() {   
    const myDate = new Date(2021, 4, 8);
    const currentDate = new Date();

    const timeLeft = myDate - currentDate;
    const daysLeft = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
    const hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60 % 24)
    const minutesLeft = Math.floor(timeLeft / 1000 / 60 % 60)
    const secondsLeft = Math.floor(timeLeft / 1000 % 60)

    //console.log(`${daysLeft}, ${hoursLeft}, ${minutesLeft}, ${secondsLeft}`)

    days.innerHTML = daysLeft;
    hours.innerHTML = hoursLeft;
    minutes.innerHTML = minutesLeft;
    seconds.innerHTML = secondsLeft;
}

setInterval(countdown, 1000)