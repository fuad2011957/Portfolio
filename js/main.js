document.addEventListener('DOMContentLoaded', () => {
    const cardHeaders = document.querySelectorAll('.card-header');

    cardHeaders.forEach(cardHeader => {
        cardHeader.addEventListener('click', () => {
            const cardContainer = cardHeader.closest('.card-container');

            if (cardContainer) {
                cardContainer.classList.toggle('expanded');
            };
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('header');

    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add('show');
            header.classList.add('box-shadow');
        } else {
            scrollToTopBtn.classList.remove('show');
            header.classList.remove('box-shadow');
        };
    });


    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const header__allBg = document.querySelector('.header__all-bg');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / -90;
    const y = e.clientY / -90;
    header__allBg.style.backgroundPosition = `${x}px ${y}px`;
});

// Burger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenuBtn = document.querySelector('.burger-menu-btn');
    const burgerMenu = document.querySelector('.BURGER__MENU');
    const menuLinks = document.querySelectorAll('.BURGER__MENU nav ul li a');

    // Toggle menu function
    function toggleMenu() {
        burgerMenuBtn.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        document.body.style.overflow = burgerMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu on burger button click
    burgerMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (burgerMenu.classList.contains('active') && !burgerMenu.contains(e.target) && !burgerMenuBtn.contains(e.target)) {
            toggleMenu();
        };
    });

    // Close menu on escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact__form form');
    const messageTextarea = document.querySelector('.contact__message textarea');
    const sendButton = document.querySelector('.contact__message button');

    sendButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = messageTextarea.value;

        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        // Показываем индикатор загрузки
        sendButton.disabled = true;
        sendButton.innerHTML = `
            <svg class="animate-spin" width="24" height="24" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Отправка...</span>
        `;

        try {
            const response = await fetch('http://localhost:3000/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ Сообщение успешно отправлено!');
                contactForm.reset();
                messageTextarea.value = '';
            } else {
                throw new Error(data.error || 'Что-то пошло не так');
            }
        } catch (error) {
            alert('❌ Ошибка при отправке сообщения: ' + error.message);
        } finally {
            // Восстанавливаем кнопку
            sendButton.disabled = false;
            sendButton.innerHTML = `
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"></path>
                </svg>
                <span>Отправить</span>
            `;
        }
    });
});
