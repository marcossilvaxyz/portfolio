// ======================================================
// portfolio - script
// mars
// ======================================================



// menu mobile
const menuButton = document.querySelector(".menu-mobile")
const menu = document.querySelector(".menu")

if (menuButton && menu) {
    menuButton.addEventListener("click",() => {
        menu.classList.toggle("active")
    })
    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click",() => {
            menu.classList.remove("active")
        })
    })
}

// header ao rolar
const header = document.getElementById("header")

if (header) {
    window.addEventListener("scroll",() => {
        if (window.scrollY > 80) {
            header.classList.add("scroll")
        } else {
            header.classList.remove("scroll")
        }
    })
}

// scroll suave dos links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click",(e) => {
        const target = document.querySelector(link.getAttribute("href"))

        if (target) {
            e.preventDefault()
            target.scrollIntoView({ behavior:"smooth" })
        }
    })
})

// botao de voltar pro topo
const buttonTop = document.createElement("button")
buttonTop.innerHTML="↑"
buttonTop.className="back-top"
document.body.appendChild(buttonTop)

buttonTop.addEventListener("click",() => {
    window.scrollTo({ top:0, behavior:"smooth" })
});

window.addEventListener("scroll",() => {
    if (window.scrollY > 500) {
        buttonTop.classList.add("show")
    } else {
        buttonTop.classList.remove("show")
    }
})

// animacao ao aparecer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show")
        }
    })
},
{
threshold:.15
}
)

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden")
    observer.observe(section)
})

// menu ativo
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".menu a")

window.addEventListener("scroll",() => {
let current=""

sections.forEach(section => {
const sectionTop = section.offsetTop - 150

if (window.scrollY >= sectionTop) {
    current = section.getAttribute("id")
}
})

navLinks.forEach(link => {
    link.classList.remove("current")

    if (link.getAttribute("href") === "#" + current) {
        link.classList.add("current")
    }
})
})

// efeito digitacao
const title = document.querySelector("#home h3");

if (title) {
    const text = "Desenvolvedor Front-end em formação"
    let index = 0
    title.textContent=""
    function typeWriter() {
        if (index < text.length) {
            title.textContent +=
            text.charAt(index)
            index++
            setTimeout(typeWriter, 70)
        }
    }
    window.addEventListener("load", typeWriter)
}

// animacao dos links externos
document.querySelectorAll("a[target='_blank']").forEach(link => {
    link.addEventListener("click",() => {
        link.style.transform = "scale(.95)"
        setTimeout(() => {
            link.style.transform=""
        }, 150)
    })
})

// copiar email
const email = document.querySelector(".fa-envelope")

if (email) {
    email.parentElement.addEventListener("click",(e) => {
        e.preventDefault()
        navigator.clipboard.writeText("marcossilva@gmail.com")
        email.parentElement.classList.add("copied")
        alert("Email copiado!")
        setTimeout(() => {
            email.parentElement.classList.remove("copied")
        }, 1000)
    })
}

// animacao dos botoes principais
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("mouseenter",() => {
        button.style.transform = "translateY(-5px)"
    })

    button.addEventListener("mouseleave",() => {
        button.style.transform=""
    })
})

// ano automatico footer
const footer = document.querySelector("footer p")

if (footer) {
    const year = new Date().getFullYear()
    footer.innerHTML = `© ${year} Marcos Alexandre. Todos os direitos reservados.`
}

// lazy load das imagens
document.querySelectorAll("img").forEach(image => {
    image.loading="lazy"
})

// preload final
window.addEventListener("load",() => {
    document.body.classList.add("loaded")
})