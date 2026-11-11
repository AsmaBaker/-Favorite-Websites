import JustValidate from 'just-validate';
import Swal from 'sweetalert2';
const STORAGE_KEY = "favorite-website";
const form = document.querySelector("[data-form='website']") ;
const websites = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];

const countBadge = document.querySelector("[data-count]");
const tableBody = document.querySelector("[data-table='website']");

const validator = new JustValidate(form);

//validation 

validator
.addField(form.querySelector('[name="name"]'),
[
  {
     rule: 'required',
     errorMessage : "name is required"
  },
  {
     rule: 'minLength',
      value: 3,
  }
]
).addField(form.querySelector('[name="email"]'),
[
  {
     rule: 'required',
     errorMessage : "email is required"
  },
 {
    rule: 'email',
  }
]
).addField(form.querySelector('[name="url"]'),
[
  {
     rule: 'required',
     errorMessage : "url is required"
  },
]
).addField(form.querySelector('[name="password"]'),
[
  {
     rule: 'required',
     errorMessage : "passowrd is required"
  },
]
).onSuccess( ()=>{ //add 
//form.addEventListener("submit" , (e)=>{
//e.preventDefault();
const website = {id:crypto.randomUUID() , ...Object.fromEntries(new FormData(form))};
websites.push(website);
localStorage.setItem(STORAGE_KEY,JSON.stringify(websites));
form.reset();
render();
Swal.fire({
  title: "Drag me!",
  icon: "success",
  draggable: true
});
})
 //})

 
//read
function render (){
    const result = websites.map((site,index)=>
        ` <tr class="hover:bg-slate-50">
              <td class="px-4 py-3">${index+1}</td>
              <td class="px-4 py-3 font-medium">${site.name}</td>
              <td class="px-4 py-3"><a href="${site.url}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline">${site.url}</a></td>
              <td class="px-4 py-3">${site.email}</td>
              <td class="px-4 py-3">
                <div class="flex justify-center gap-2">
                  <a href="./details.html?id=${site.id}" class="inline-flex items-center justify-center rounded-lg bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700 transition hover:bg-indigo-200">Details</a>
                  <button type="button" class="btn-edit">Edit</button>
                  <button type="button" data-delete class="btn-delete" onclick="deleteWebsite(${index})" >Delete</button>
                </div>
              </td>
            </tr>`
).join(' ');
 tableBody.innerHTML = result;
countBadge.textContent = `${websites.length} item` ;
}

render();

//delete
const deleteBtn = document.querySelector("[data-delete]")

function deleteWebsite(index){
    
Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
     websites.splice(index,1);
     localStorage.setItem(STORAGE_KEY,JSON.stringify(websites));
     render();
     Swal.fire("Saved!", "", "success");
  }
  else if (result.isDenied) Swal.fire("Changes are not saved", "", "info");
});
}
window.deleteWebsite = deleteWebsite;
