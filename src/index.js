console.log("hi")
import x from './x.js'
import png from './assets/1.png'


console.log(png)

const div = document.getElementById('app');
console.log(x)

div.innerHTML = `
    <img src="${png}">
`

const button = document.createElement('button');
button.innerText = '懒加载';
button.onclick = () => {
    import('./lazy').then(module => {
        console.log(module)
        module.default()
    })
}
div.appendChild(button);