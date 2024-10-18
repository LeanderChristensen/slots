//let leaf = `<img src="assets/leaf.png" class="slot leaf" alt="leaf">`;
let cherries = `<img src="assets/cherries.png" class="slot cherries" alt="cherries">`;
let grapes = `<img src="assets/grapes.png" class="slot grapes" alt="grapes">`;
let lemon = `<img src="assets/lemon.png" class="slot lemon" alt="lemon">`;
let watermelon = `<img src="assets/watermelon.png" class="slot watermelon" alt="watermelon">`;
let seven = `<img src="assets/seven.png" class="slot seven" alt="seven">`;
//let bar = `<img src="assets/bar.png" class="slot bar" alt="bar">`;
let diamond = `<img src="assets/diamond.png" class="slot diamond" alt="diamond">`;

let slots = document.getElementsByClassName('slot-container');
let spinButton = document.getElementById('spin');
let statusText = document.getElementById('status');
let moneyText = document.getElementById('money');
let slotsArray = [[], [], []];
let group = 0;
let groupIndex = 0;
let money = 1000;
let spinCost = 20;
moneyText.innerHTML = `$${numberWithSpaces(money)}`;

function reset () {
	spinButton.disabled = true;
	slotsArray = [[], [], []];
	group = 0;
	for (let i = 0; i < slots.length; i++) {
		const random = Math.floor(Math.random() * 101);
		if (random <= 18) {
			slotsArray[group].push(1);
		} else if (random > 18 && random <= 36) {
			slotsArray[group].push(2);
		}  else if (random > 36 && random <= 54) {
			slotsArray[group].push(3);
		} else if (random > 54 && random <= 72) {
			slotsArray[group].push(4);
		} else if (random > 72 && random <= 90) {
			slotsArray[group].push(5);
		} else {
			slotsArray[group].push(6);
		}
		if (group === 2) {
			group = 0;
		} else {
			group++;
		}
	}
	// for (let j = 0; j < 4; j++) {
	// 	if (slotsArray[0][j] === slotsArray[1][j] && slotsArray[1][j] === slotsArray[2][j]) {
	// 		reset();
	// 	}
	// }
	spinButton.disabled = false;
}

reset();

group = 0;

for (let i = 0; i < slots.length; i++) {
	switch (slotsArray[group][groupIndex]) {
		case 1:
			slots[i].innerHTML = seven;
			break;
		case 2:
			slots[i].innerHTML = cherries;
			break;
		case 3:
			slots[i].innerHTML = grapes;
			break;
		case 4:
			slots[i].innerHTML = lemon;
			break;
		case 5:
			slots[i].innerHTML = watermelon;
			break;
		case 6:
			slots[i].innerHTML = diamond;
			break;
	}
	if (group === 2) {
		group = 0;
		groupIndex++;
	} else {
		group++;
	}
}

group = 0;
groupIndex = 0;

async function spin() {
	money -= spinCost;
	moneyText.innerHTML = `$${numberWithSpaces(money)}`;
	let b = Array.from(document.getElementsByClassName("glow"));
	for (let i = 0; i < b.length; i++) {
		b[i].classList.remove("glow");
	}
	statusText.innerHTML = "Error";
	statusText.style.visibility = "hidden";
	reset();
	spinButton.disabled = true;
	for(let j = 0; j < 20; j++) {
		let slotsTempArray = [[], [], []];
		for (let k = 0; k < 3; k++) {
		for (let i = 0; i < 5; i++) {
			if (i < 4) {
				switch (slotsArray[k][i]) {
					case 1:
						slotsTempArray[k][i+1] = 1;
						break;
					case 2:
						slotsTempArray[k][i+1] = 2;
						break;
					case 3:
						slotsTempArray[k][i+1] = 3;
						break;
					case 4:
						slotsTempArray[k][i+1] = 4;
						break;
					case 5:
						slotsTempArray[k][i+1] = 5;
						break;
					case 6:
						slotsTempArray[k][i+1] = 6;
						break;
				} 
			} else {
				switch (slotsArray[k][i]) {
					case 1:
						slotsTempArray[k][0] = 1;
						break;
					case 2:
						slotsTempArray[k][0] = 2;
						break;
					case 3:
						slotsTempArray[k][0] = 3;
						break;
					case 4:
						slotsTempArray[k][0] = 4;
						break;
					case 5:
						slotsTempArray[k][0] = 5;
						break;
					case 6:
						slotsTempArray[k][0] = 6;
						break;
				}
			}
			// if (group === 2) {
			// 	group = 0;
			// } else {
			// 	group++;
			// }
		}
		}
		slotsArray = slotsTempArray;
		group = 0;
		groupIndex = 0;
		for (let i = 0; i < slots.length; i++) {
			switch (slotsArray[group][groupIndex]) {
				case 1:
					slots[i].innerHTML = seven;
					break;
				case 2:
					slots[i].innerHTML = cherries;
					break;
				case 3:
					slots[i].innerHTML = grapes;
					break;
				case 4:
					slots[i].innerHTML = lemon;
					break;
				case 5:
					slots[i].innerHTML = watermelon;
					break;
				case 6:
					slots[i].innerHTML = diamond;
					break;
			}
			if (group === 2) {
				group = 0;
				groupIndex++;
			} else {
				group++;
			}
		}
		await sleep(100);
	}
	let wins = 0;
	let reward = 0;
	if (slotsArray[0][1] === slotsArray[1][1] && slotsArray[1][1] === slotsArray[2][1]) {
		wins++;
		let a = document.getElementsByClassName('h1');
		switch (slotsArray[0][1]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[0][2] === slotsArray[1][2] && slotsArray[1][2] === slotsArray[2][2]) {
		wins++;
		let a = document.getElementsByClassName('h2');
				switch (slotsArray[0][2]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[0][3] === slotsArray[1][3] && slotsArray[1][3] === slotsArray[2][3]) {
		wins++;
		let a = document.getElementsByClassName('h3');
				switch (slotsArray[0][3]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[0][1] === slotsArray[0][2] && slotsArray[0][2] === slotsArray[0][3]) {
		wins++;
		let a = document.getElementsByClassName('v1');
				switch (slotsArray[0][1]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[1][1] === slotsArray[1][2] && slotsArray[1][2] === slotsArray[1][3]) {
		wins++;
		let a = document.getElementsByClassName('v2');
				switch (slotsArray[1][1]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[2][1] === slotsArray[2][2] && slotsArray[2][2] === slotsArray[2][3]) {
		wins++;
		let a = document.getElementsByClassName('v3');
				switch (slotsArray[2][1]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[0][1] === slotsArray[1][2] && slotsArray[1][2] === slotsArray[2][3]) {
		wins++;
		let a = document.getElementsByClassName('x1');
				switch (slotsArray[0][1]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (slotsArray[0][3] === slotsArray[1][2] && slotsArray[1][2] === slotsArray[2][1]) {
		wins++;
		let a = document.getElementsByClassName('x2');
				switch (slotsArray[0][3]) {
			case 1:
				reward += 200;
				break;
			case 2:
				reward += 50;
				break;
			case 3:
				reward += 50;
				break;
			case 4:
				reward += 50;
				break;
			case 5:
				reward += 50;
				break;
			case 6:
				reward += 10000;
				break;
		}
		for (let i = 0; i < 3; i++) {
			a[i].className += " glow";
		}
	}
	if (wins > 0) {
		reward = Math.pow(reward, wins);
		money += reward;
		moneyText.innerHTML = `$${numberWithSpaces(money)}`;
		statusText.innerHTML = `You won $${numberWithSpaces(reward)}`;
		statusText.style.visibility = "visible";
	}
	if (money < spinCost) {
		statusText.innerHTML = "Game over!";
		statusText.style.visibility = "visible";
		spinButton.disabled = true;
	} else {
		spinButton.disabled = false;
	}
}

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}