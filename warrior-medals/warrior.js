function formatRaceTime(ms) {
	let m = Math.floor(ms / 60000)
	let s = (ms % 60000) / 1000
	return m + ":" + (s < 10 ? "0" : "") + s + (ms % 1000 == 0 ? ".0" : "") + (ms % 100 == 0 ? "0" : "") + (ms % 10 == 0 ? "0" : "")
}

function stripFormatCodes(input) {
	return input.replace(/\$([0-9a-fA-F]{1,3}|[gimnostuwzGIMNOSTUWZ<>]|[hlpHLP](\[[^\]]+\])?)/gm, "")
}

async function fetchData() {
	try {
		const response = await fetch("https://raw.githubusercontent.com/ezio416/tm-json/main/warrior.json")

		if (!response.ok) {
			throw new Error("couldn't fetch resource")
		}

		const data = await response.json()
		console.log(data)

		let out = ""
		for (let map of data.Seasonal) {
			let warrior = map.warriorTime
			let custom = false

			if (map.custom != null) {
				warrior = map.custom
				custom = true
			}

			out += `
				<tr>
					<td>
						<!-- <img style="vertical-align:middle" src="${map.name.split(" ")[0].toLowerCase()}_32.png" width=24> -->
						<span style="vertical-align:middle">
							<a href="https://trackmania.io/#/leaderboard/${map.mapUid}">${map.name}</a>
						</span>
					</td>

					<td>
			`

			if (custom) {
				out += `
						<div class="tooltip"><i>
				`
			}

			out += `
							<!-- <img style="vertical-align:middle" src="warrior_32.png" width=24> -->
							<span style="vertical-align:middle">${formatRaceTime(warrior)}</span>
			`

			if (custom) {
				out += `</i>
							<span class="tooltiptext">
								${map.reason}
							</span>
						</div>
				`
			}

			out += `
					</td>

					<td>
						<!-- <img style="vertical-align:middle" src="author_32.png" width=24> -->
						<span style="vertical-align:middle">${formatRaceTime(map.authorTime)}</span>
					</td>
				</tr>
			`
		}

		document.querySelector("#table-seasonal").innerHTML = out
		document.getElementById("defaultOpen").click();

		out = ""
		for (let map of data.Weekly) {
			let warrior = map.warriorTime
			let custom = false

			if (map.custom != null) {
				warrior = map.custom
				custom = true
			}

			out += `
				<tr>
					<td>${(map.number < 10 ? "0" : "") + map.number}</td>

					<td>
						<span style="vertical-align:middle">
							<a href="https://trackmania.io/#/leaderboard/${map.mapUid}">${stripFormatCodes(map.name)}</a>
						</span>
					</td>

					<td>
			`

			if (custom) {
				out += `
						<div class="tooltip"><i>
				`
			}

			out += `
							<!-- <img style="vertical-align:middle" src="warrior_32.png" width=24> -->
							<span style="vertical-align:middle">${formatRaceTime(warrior)}</span>
			`

			if (custom) {
				out += `</i>
							<span class="tooltiptext">
								${map.reason}
							</span>
						</div>
				`
			}

			out += `
					</td>

					<td>
						<!-- <img style="vertical-align:middle" src="author_32.png" width=24> -->
						<span style="vertical-align:middle">${formatRaceTime(map.authorTime)}</span>
					</td>
				</tr>
			`
		}

		document.querySelector("#table-weekly").innerHTML = out

		out = ""
		for (let map of data.Totd) {
			let warrior = map.warriorTime
			let custom = false

			if (map.custom != null) {
				warrior = map.custom
				custom = true
			}

			let season = ""
			switch (parseInt(map.date.split("-")[1])) {
				case 1: case 2: case 3:
					season = "winter"
					break
				case 4: case 5: case 6:
					season = "spring"
					break
				case 7: case 8: case 9:
					season = "summer"
					break
				default:
					season = "fall"
			}

			out += `
				<tr>
					<td>
						<!-- <img style="vertical-align:middle" src="${season}_32.png" width=24> -->
						<span style="vertical-align:middle">
							${map.date}
						</span>
					</td>

					<td>
						<a href="https://trackmania.io/#/leaderboard/${map.mapUid}">${stripFormatCodes(map.name)}</a>
					</td>

					<td>
			`

			if (custom) {
				out += `
						<div class="tooltip"><i>
				`
			}

			out += `
							<!-- <img style="vertical-align:middle" src="warrior_32.png" width=24> -->
							<span style="vertical-align:middle">${formatRaceTime(warrior)}</span>
			`

			if (custom) {
				out += `</i>
							<span class="tooltiptext">
								${map.reason}
							</span>
						</div>
				`
			}

			out += `
					</td>

					<td>
						<!-- <img style="vertical-align:middle" src="author_32.png" width=24> -->
						<span style="vertical-align:middle">${formatRaceTime(map.authorTime)}</span>
					</td>
				</tr>
			`
		}

		document.querySelector("#table-totd").innerHTML = out

		out = ""
		for (let map of data.Other) {
			let warrior = map.warriorTime
			let custom = false

			if (map.custom != null) {
				warrior = map.custom
				custom = true
			}

			out += `
				<tr>
					<td>
			`

			if (map.clubId != 0) {
				out += `<a href="https://trackmania.io/#/clubs/${map.clubId}">${stripFormatCodes(map.clubName)}</a>`
			}

			out += `</td>`

			if (map.clubId != 0 && map.campaignId != 0) {
				out += `
					<td>
						<a href="https://trackmania.io/#/campaigns/${map.clubId}/${map.campaignId}">${stripFormatCodes(map.campaignName)}</a>
					</td>
				`
			} else {
				out += `<td>${stripFormatCodes(map.campaignName)}</td>`
			}

			out += `
					<td>
						<a href="https://trackmania.io/#/leaderboard/${map.mapUid}">${stripFormatCodes(map.name)}</a>
					</td>

					<td>
			`

			if (custom) {
				out += `<div class="tooltip"><i>`
			}

			out += `
				<!-- <img style="vertical-align:middle" src="warrior_32.png" width=24> -->
				<span style="vertical-align:middle">${formatRaceTime(warrior)}</span>
			`

			if (custom) {
				out += `</i>
							<span class="tooltiptext">
								${map.reason}
							</span>
						</div>
				`
			}

			out += `
					</td>

					<td>
						<!-- <img style="vertical-align:middle" src="author_32.png" width=24> -->
						<span style="vertical-align:middle">${formatRaceTime(map.authorTime)}</span>
					</td>
				</tr>
			`
		}

		document.querySelector("#table-other").innerHTML = out

	} catch (error) {
		console.error(error)
	}
}

fetchData()

function openSection(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
