let scrollDelay = 3000; // ms 단위입니다.
let comicScroll;
let scrollEventTriggered = false;

scrollStart();
console.log("스크롤을 시작합니다.");

document.addEventListener("keydown", (event) => {
	if (event.key === "e" || event.key === "E" || event.key === "ㄷ") {
		clearInterval(comicScroll);
		console.log("스크롤을 종료합니다.");
	} else if (event.key === "s" || event.key === "S" || event.key === "ㄴ") {
		scrollStart();
		console.log("스크롤을 시작합니다.");
	}
});

window.addEventListener("scroll", () => {
	if (!scrollEventTriggered && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
		console.log("페이지 스크롤이 마지막에 도달했습니다.\n다음 페이지로 이동합니다.");
		nextPageMove();
		scrollEventTriggered = true;
	}
});

function scrollToHorizontalCenter() {
	let vWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let scrollX = (document.body.scrollWidth - vWidth) / 2;
	window.scrollTo(scrollX, window.pageYOffset);
}

function scrollMove() {
	window.scrollBy({
		top: window.innerHeight,
		left: 0,
		behavior: "smooth",
	});
}

function scrollInterval() {
	comicScroll = setInterval(() => {
		scrollToHorizontalCenter();
		scrollMove();
	}, scrollDelay);
}

function scrollStart() {
	scrollToHorizontalCenter();
	scrollMove();
	scrollInterval();
}

function nextPageMove() {
	const url = new URL(window.location.href);
	const currentNo = parseInt(url.searchParams.get("no"));
	url.searchParams.set("no", currentNo + 1);
	window.location.href = url.toString();
}
