const BOT_TOKEN = '8092921632:AAEBm2j4X5qbqaVOkVKta00OUt1ekUlSMEc';

const CHAT_ID = '7656571768';


async function sendToTelegram(name, email, message) {
    const text = `Новое сообщение с вашего сайта!\n\nИмя: ${name}\nEmail: ${email}\nСообщение: ${message}`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        if (data.ok) {
            alert('Сообщение успешно отправлено!');
        } else {
            throw new Error('Не удалось отправить сообщение');
        }
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        alert('Не удалось отправить сообщение. Пожалуйста, попробуйте позже.');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact__form form');
    const messageTextarea = document.querySelector('.contact__message textarea');
    const sendButton = document.querySelector('.contact__message button');

    if (contactForm && messageTextarea && sendButton) {
        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            
            if (!nameInput.value || !emailInput.value || !messageTextarea.value) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            sendToTelegram(nameInput.value, emailInput.value, messageTextarea.value);
            
            
            nameInput.value = '';
            emailInput.value = '';
            messageTextarea.value = '';
        });
    }
}); 