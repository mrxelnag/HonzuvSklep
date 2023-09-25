const dialog = document.querySelector("dialog")



const openWineList = document.querySelector("#openWineList")
openWineList.addEventListener("click", () => {
  dialog.showModal()
})
const openWineListNav = document.querySelector("#openWineListNav")
openWineListNav.addEventListener("click", () => {
  dialog.showModal()
})

const closeWineList = document.querySelector("#closeWineList")
closeWineList.addEventListener("click", () => {
  dialog.close()
})
dialog.addEventListener("click", e => {
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close()
    }
  })