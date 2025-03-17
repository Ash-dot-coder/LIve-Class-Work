let timerId;
const count = 10;
const apiKey = "cCDc3SZ61NneOPQolsufqArfXsHl2LjSSfp09D8H6QE";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imgContainer = document.querySelector(".image-container");
let isFetching = false;

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);

    if (response.status === 403) {
      console.error(
        "Rate limit exceeded. Please wait before making more requests."
      );
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Rate limit exceeded. Please try again later.";
      errorMessage.style.color = "red";
      document.body.appendChild(errorMessage);
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

const renderData = (data) => {
  data.forEach((element) => {
    const imgTag = document.createElement("img");
    imgTag.src = element.urls.regular;
    imgTag.alt = element.alt_description;
    imgContainer.appendChild(imgTag);
  });
};

const handleScroll = async () => {
  if (isFetching) return;

  const scrollPosition = window.scrollY + window.innerHeight;
  const threshold = document.body.offsetHeight - 200;
  if (scrollPosition >= threshold) {
    isFetching = true;
    const data = await fetchData();
    renderData(data);
    isFetching = false;
  }
};

window.addEventListener("scroll", () => {
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(handleScroll, 200);
});
(async () => {
  const data = await fetchData();
  renderData(data);
})();

window.addEventListener("scroll", handleScroll);
