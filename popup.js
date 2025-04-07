chrome.storage.local.get(null, (data) => {
  const list = document.getElementById('data');
  Object.entries(data).forEach(([site, seconds]) => {
    const li = document.createElement('li');
    li.textContent = `${site}: ${Math.round(seconds / 60)} mins`;
    list.appendChild(li);
  });
});
