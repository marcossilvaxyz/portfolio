// ======================================================
// portfolio - script
// mars
// ======================================================



// configuracoes
const reducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

// menu mobile
const menuButton = document.querySelector(".menu-mobile")
const menu = document.querySelector(".menu")
const menuIcon = document.querySelector(".menu-mobile i")

function closeMenu() {
    if (!menuButton || !menu) return

    menu.classList.remove("active")
    menuButton.setAttribute("aria-expanded","false")
    menuButton.setAttribute("aria-label","Abrir menu")
    document.body.classList.remove("menu-open")

    if (menuIcon) {
        menuIcon.classList.remove("fa-xmark")
        menuIcon.classList.add("fa-bars")
    }
}

if (menuButton && menu) {
    menuButton.addEventListener("click",() => {
        const active = menu.classList.toggle("active")

        menuButton.setAttribute("aria-expanded",active)
        menuButton.setAttribute(
            "aria-label",
            active ? "Fechar menu" : "Abrir menu"
        )

        document.body.classList.toggle("menu-open",active)

        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars",!active)
            menuIcon.classList.toggle("fa-xmark",active)
        }
    })

    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click",closeMenu)
    })

    document.addEventListener("keydown",(event) => {
        if (
            event.key === "Escape" &&
            menu.classList.contains("active")
        ) {
            closeMenu()
            menuButton.focus()
        }
    })

    document.addEventListener("click",(event) => {
        const clickedOutside =
            menu.classList.contains("active") &&
            !menu.contains(event.target) &&
            !menuButton.contains(event.target)

        if (clickedOutside) {
            closeMenu()
        }
    })

    window.addEventListener("resize",() => {
        if (window.innerWidth > 850) {
            closeMenu()
        }
    })
}

// header ao rolar
const header = document.getElementById("header")

function updateHeader() {
    if (!header) return

    if (window.scrollY > 50) {
        header.classList.add("scroll")
    } else {
        header.classList.remove("scroll")
    }
}

window.addEventListener("scroll",updateHeader,{ passive:true })
updateHeader()

// scroll suave dos links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click",(e) => {
        const href = link.getAttribute("href")
        const target = href ? document.querySelector(href) : null

        if (target) {
            e.preventDefault()
            target.scrollIntoView({
                behavior:reducedMotion ? "auto" : "smooth"
            })
        }
    })
})

// botao de voltar pro topo
const buttonTop = document.createElement("button")

buttonTop.innerHTML='<i class="fa-solid fa-arrow-up"></i>'
buttonTop.className="back-top"
buttonTop.type="button"
buttonTop.setAttribute("aria-label","Voltar para o início")
buttonTop.setAttribute("title","Voltar para o início")
document.body.appendChild(buttonTop)

buttonTop.addEventListener("click",() => {
    window.scrollTo({
        top:0,
        behavior:reducedMotion ? "auto" : "smooth"
    })
})

window.addEventListener("scroll",() => {
    if (window.scrollY > 500) {
        buttonTop.classList.add("show")
    } else {
        buttonTop.classList.remove("show")
    }
},{ passive:true })

// progresso da pagina
const scrollProgress = document.querySelector(".scroll-progress")

function updateScrollProgress() {
    if (!scrollProgress) return

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

    const pageProgress =
        pageHeight > 0
            ? (window.scrollY / pageHeight) * 100
            : 0

    const progress =
        Math.min(100,Math.max(0,pageProgress))

    scrollProgress.style.width = `${progress}%`
}

window.addEventListener("scroll",updateScrollProgress,{ passive:true })
updateScrollProgress()

// animacao ao aparecer
if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show")
                observer.unobserve(entry.target)
            }
        })
    },
    {
        threshold:.1
    })

    document.querySelectorAll("section:not(#home)").forEach(section => {
        section.classList.add("hidden")
        observer.observe(section)
    })
}

// menu ativo
const sections = document.querySelectorAll("main section")
const navLinks = document.querySelectorAll(".menu a")

function setActiveMenu(sectionId) {
    navLinks.forEach(link => {
        const active =
            link.getAttribute("href") === "#" + sectionId

        link.classList.toggle("current",active)

        if (active) {
            link.setAttribute("aria-current","page")
        } else {
            link.removeAttribute("aria-current")
        }
    })
}

function getCurrentSection() {
    if (!sections.length) return "home"

    const headerHeight =
        header ? header.offsetHeight : 0

    const referencePoint =
        window.scrollY +
        headerHeight +
        window.innerHeight * .32

    let current=sections[0].getAttribute("id")

    sections.forEach(section => {
        if (referencePoint >= section.offsetTop) {
            current=section.getAttribute("id")
        }
    })

    const pageBottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.documentElement.scrollHeight - 4

    if (pageBottom) {
        current=
            sections[sections.length - 1].getAttribute("id")
    }

    return current
}

function updateActiveMenu() {
    setActiveMenu(getCurrentSection())
}

window.addEventListener("scroll",updateActiveMenu,{ passive:true })
window.addEventListener("resize",updateActiveMenu)
window.addEventListener("load",updateActiveMenu)

navLinks.forEach(link => {
    link.addEventListener("click",() => {
        const sectionId=
            link.getAttribute("href").replace("#","")

        setActiveMenu(sectionId)
    })
})

updateActiveMenu()

// efeito digitacao
const title = document.querySelector("#home h3")

if (title && !reducedMotion) {
    const text = "Desenvolvedor Front-end em formação"
    let index = 0

    title.textContent=""

    function typeWriter() {
        if (index < text.length) {
            title.textContent += text.charAt(index)
            index++
            setTimeout(typeWriter,65)
        }
    }

    window.addEventListener("load",typeWriter)
}

// mensagem da pagina
const toast = document.createElement("div")

toast.className="toast"
toast.setAttribute("role","status")
toast.setAttribute("aria-live","polite")
document.body.appendChild(toast)

let toastTimer

function showMessage(message) {
    clearTimeout(toastTimer)

    toast.textContent=message
    toast.classList.add("show")

    toastTimer=setTimeout(() => {
        toast.classList.remove("show")
    },2500)
}

// copiar email
const emailButton = document.querySelector(".email-copy")

function fallbackCopy(text) {
    let textArea

    try {
        textArea=document.createElement("textarea")
        textArea.value=text
        textArea.setAttribute("readonly","")
        textArea.style.position="fixed"
        textArea.style.opacity="0"

        document.body.appendChild(textArea)
        textArea.select()

        return document.execCommand("copy")
    } catch(error) {
        return false
    } finally {
        if (textArea) {
            textArea.remove()
        }
    }
}

if (emailButton) {
    emailButton.addEventListener("click",async() => {
        const email = emailButton.dataset.email
        let copied=false

        if (!email) {
            showMessage("E-mail não encontrado.")
            return
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email)
                copied=true
            } else {
                copied=fallbackCopy(email)
            }
        } catch(error) {
            copied=fallbackCopy(email)
        }

        if (copied) {
            emailButton.classList.add("copied")
            emailButton.innerHTML=
                '<i class="fa-solid fa-check"></i> E-mail copiado'

            showMessage("E-mail copiado para a área de transferência!")

            setTimeout(() => {
                emailButton.classList.remove("copied")
                emailButton.innerHTML=
                    '<i class="fa-regular fa-copy"></i> Copiar e-mail'
            },2200)
        } else {
            showMessage(`E-mail: ${email}`)
        }
    })
}

// ano automatico footer
const footer = document.querySelector("footer p")

if (footer) {
    const year = new Date().getFullYear()
    footer.innerHTML = `© ${year} Marcos Alexandre. Todos os direitos reservados.`
}

// lazy load das imagens
document.querySelectorAll("img:not([loading])").forEach(image => {
    image.loading="lazy"
})

// preload final
window.addEventListener("load",() => {
    document.body.classList.add("loaded")
})