const STORAGE_KEY = "favorite-website";
const params = new URLSearchParams(location.search);
const id = params.get('id');
const websites = JSON.parse(localStorage.getItem(STORAGE_KEY));

let passwordVisible = false;
console.log(websites);
const website = websites.find((site)=> site.id == id );
const details = document.querySelector("[data-details]")
document.querySelector("[datafield='name']").textContent = website.name;
document.querySelector("[datafield='url']").textContent = website.url;
document.querySelector("[datafield='email']").textContent = website.email;

details.hidden=false;

const toggleBtn = document.querySelector("[data-toggle-password]");

toggleBtn.addEventListener('click',()=>{
    passwordVisible = !passwordVisible;
    document.querySelector("[data-field='password']").textContent = passwordVisible 
    ? website.password : "••••••••"
})