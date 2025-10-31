// ======== АВТОМАТИЧЕСКАЯ И РУЧНАЯ СМЕНА ТЕМЫ ========

const toggleBtn = document.getElementById('theme-toggle');
const themeEmoji = toggleBtn.querySelector('.theme-emoji');
const submitBtn = document.getElementById("submitFeedback");

function setTheme(mode, save = true) {
  if (mode === 'dark') {
    document.body.classList.add('dark');
    themeEmoji.textContent = '🌙';
  } else {
    document.body.classList.remove('dark');
    themeEmoji.textContent = '☀️';
  }
  if (save) localStorage.setItem('theme', mode);
}

function autoTheme() {
  const hour = new Date().getHours();
  return (hour >= 19 || hour < 7) ? 'dark' : 'light';
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved, false);
  else setTheme(autoTheme(), false);
});

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// ======== ДВИЖУЩИЕСЯ ФОНЫ ========

const shapes = document.querySelectorAll('.shape');
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

function initShapes() {
  shapes.forEach(shape => {
    const baseSize = Math.min(screenWidth, screenHeight) * 0.05;
    shape.pos = { x: Math.random() * screenWidth, y: Math.random() * screenHeight };
    shape.vel = { x: (Math.random() - 0.5) * 0.7, y: (Math.random() - 0.5) * 0.7 };
    shape.size = baseSize + Math.random() * baseSize;
    shape.targetSize = shape.size;
    shape.sizeChangeSpeed = 0.02 + Math.random() * 0.03;
    shape.style.width = shape.size + 'px';
    shape.style.height = shape.size + 'px';
  });
}

function repel(a, b) {
  const dx = (a.pos.x + a.size / 2) - (b.pos.x + b.size / 2);
  const dy = (a.pos.y + a.size / 2) - (b.pos.y + b.size / 2);
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = (a.size + b.size) / 2 + 10;
  if (dist < minDist) {
    const angle = Math.atan2(dy, dx);
    const push = (minDist - dist) * 0.03;
    a.vel.x += Math.cos(angle) * push;
    a.vel.y += Math.sin(angle) * push;
    b.vel.x -= Math.cos(angle) * push;
    b.vel.y -= Math.sin(angle) * push;
  }
}

function animate() {
  shapes.forEach((shape, i) => {
    shape.pos.x += shape.vel.x;
    shape.pos.y += shape.vel.y;

    if (shape.pos.x < 0) { shape.pos.x = 0; shape.vel.x = Math.abs(shape.vel.x); }
    if (shape.pos.x > screenWidth - shape.size) { shape.pos.x = screenWidth - shape.size; shape.vel.x = -Math.abs(shape.vel.x); }
    if (shape.pos.y < 0) { shape.pos.y = 0; shape.vel.y = Math.abs(shape.vel.y); }
    if (shape.pos.y > screenHeight - shape.size) { shape.pos.y = screenHeight - shape.size; shape.vel.y = -Math.abs(shape.vel.y); }

    for (let j = i + 1; j < shapes.length; j++) repel(shape, shapes[j]);

    shape.size += (shape.targetSize - shape.size) * shape.sizeChangeSpeed;
    if (Math.abs(shape.size - shape.targetSize) < 0.5) {
      const baseSize = Math.min(screenWidth, screenHeight) * 0.05;
      shape.targetSize = baseSize + Math.random() * baseSize;
      shape.sizeChangeSpeed = 0.01 + Math.random() * 0.04;
    }

    shape.style.transform = `translate(${shape.pos.x}px, ${shape.pos.y}px)`;
    shape.style.width = shape.size + 'px';
    shape.style.height = shape.size + 'px';
  });
  requestAnimationFrame(animate);
}

initShapes();
animate();

window.addEventListener('resize', () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  initShapes();
});

// ======== КНОПКА ВВЕРХ ========
const scrollTopBtn = document.getElementById('scrollTopBtn');

function toggleScrollBtn() {
  if (window.scrollY > 150) {
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.pointerEvents = 'auto';
  } else {
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.pointerEvents = 'none';
  }
}

// Изначально скрываем/показываем кнопку
window.addEventListener('load', toggleScrollBtn);
window.addEventListener('scroll', toggleScrollBtn);

scrollTopBtn.addEventListener('click', () => 
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// ======== FAQ ========

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => item.addEventListener('click', () => item.classList.toggle('open')));

// ======== ПЛАВНАЯ АНИМАЦИЯ ПРОКРУТКИ ========
document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".scroll-animate");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        // убираем класс только если элемент реально далеко вне зоны
        if (entry.boundingClientRect.top > window.innerHeight || entry.boundingClientRect.bottom < 0) {
          entry.target.classList.remove("visible");
        }
      }
    });
  }, { threshold: 0.25 });

  scrollElements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(card => {
    const stars = card.querySelectorAll(".stars img");
    if (stars.length === 5) {
      card.classList.add("highlight");
    }
  });
});

window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});

// В самом начале script.js
window.scrollTo(0, 0); // сброс скролла

// ======= ЛОГИКА ТЕСТА =======

const startBtn = document.querySelector('.start-test-btn');
const heroSection = document.querySelector('.hero');
const testContainer = document.getElementById('test-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

const questions = [
  {
    question: "Как вы предпочитаете проводить свободное время? (Вопрос 1/30)",
    options: [
      "Чтение книг или работа над проектом",
      "Встречи с друзьями и мероприятия",
      "Спорт и активный отдых",
      "Путешествия и новые впечатления"
    ]
  },
  {
    question: "Какой стиль работы вам ближе? (Вопрос 2/30)",
    options: [
      "Индивидуальная работа",
      "Командная работа",
      "Работа в условиях конкуренции",
      "Работа с клиентами и людьми"
    ]
  },
  {
    question: "Как вы справляетесь со стрессом? (Вопрос 3/30)",
    options: [
      "Стараюсь избегать стрессовых ситуаций",
      "Использую спорт или хобби",
      "Стресс мотивирует меня работать лучше",
      "Анализирую и решаю проблему спокойно"
    ]
  },
  {
    question: "Как вы относитесь к рутине? (Вопрос 4/30)",
    options: [
      "Люблю стабильность и порядок",
      "Предпочитаю разнообразие",
      "Рутина быстро утомляет",
      "Адаптируюсь, если это нужно"
    ]
  },
  {
    question: "Насколько важен карьерный рост? (Вопрос 5/30)",
    options: [
      "Очень важен",
      "Важно, но не главное",
      "Не особо важно",
      "Не интересует вообще"
    ]
  },
  {
    question: "Как вы относитесь к технологиям? (Вопрос 6/30)",
    options: [
      "Обожаю новые технологии",
      "Использую, но без фанатизма",
      "Пользуюсь только ИИ",
      "Не имею отношения к технологиям"
    ]
  },
  {
    question: "Что для вас важнее в работе? (Вопрос 7/30)",
    options: [
      "Высокая зарплата",
      "Комфорт и стабильность",
      "Возможность помогать другим",
      "Престиж профессии"
    ]
  },
  {
    question: "Какой уровень общения с клиентами вам комфортен? (Вопрос 8/30)",
    options: [
      "Минимальный, люблю тишину",
      "Иногда, если нужно",
      "Постоянно, люблю общаться",
      "Работаю только с людьми"
    ]
  },
  {
    question: "Как вы относитесь к лидерству? (Вопрос 9/30)",
    options: [
      "Предпочитаю следовать за другими",
      "Могу быть лидером при необходимости",
      "Люблю руководить и вдохновлять",
      "Лидерство не для меня"
    ]
  },
  {
    question: "Что вас больше всего вдохновляет в работе? (Вопрос 10/30)",
    options: [
      "Создание нового",
      "Командные успехи",
      "Помощь другим",
      "Признание и достижения"
    ]
  },
  {
    question: "Как вы принимаете решения? (Вопрос 11/30)",
    options: [
      "Долго обдумываю",
      "Слушаю интуицию",
      "Спрашиваю мнение других",
      "Решаю быстро"
    ]
  },
  {
    question: "Как вы относитесь к риску? (Вопрос 12/30)",
    options: [
      "Избегаю риска",
      "Приемлю умеренный риск",
      "Люблю рисковать",
      "Действую осторожно"
    ]
  },
  {
    question: "Какой формат работы вам ближе? (Вопрос 13/30)",
    options: [
      "Офис, всё чётко",
      "Удалёнка и свобода",
      "Гибрид — баланс",
      "На месте, где движ"
    ]
  },
  {
    question: "Как вы реагируете на критику? (Вопрос 14/30)",
    options: [
      "Принимаю и анализирую",
      "Иногда обижаюсь",
      "Не обращаю внимания",
      "Стараюсь доказать обратное"
    ]
  },
  {
    question: "Что для вас главное в команде? (Вопрос 15/30)",
    options: [
      "Доверие и поддержка",
      "Общий результат",
      "Весёлая атмосфера",
      "Возможность проявить себя"
    ]
  },
  {
    question: "Как вы относитесь к дедлайнам? (Вопрос 16/30)",
    options: [
      "Всегда укладываюсь заранее",
      "Иногда тяну до последнего",
      "Работаю в последний момент",
      "Ненавижу спешку"
    ]
  },
  {
    question: "Что для вас показатель успеха? (Вопрос 17/30)",
    options: [
      "Деньги и статус",
      "Счастье и свобода",
      "Опыт и развитие",
      "Признание других"
    ]
  },
  {
    question: "Как вы предпочитаете учиться? (Вопрос 18/30)",
    options: [
      "Самостоятельно, через практику",
      "С преподавателем",
      "На курсах и лекциях",
      "С помощью видео и примеров"
    ]
  },
  {
    question: "Что вы цените в работе больше всего? (Вопрос 19/30)",
    options: [
      "Стабильность",
      "Креатив и свободу",
      "Команду и общение",
      "Возможность роста"
    ]
  },
  {
    question: "Как вы реагируете на новые задачи? (Вопрос 20/30)",
    options: [
      "С интересом и азартом",
      "Осторожно, сначала думаю",
      "Немного тревожно",
      "Отказываюсь, если непонятно"
    ]
  },
  {
    question: "Какая среда вам ближе? (Вопрос 21/30)",
    options: [
      "Тихий офис",
      "Шумный open space",
      "Кафе и коворкинги",
      "Дом и покой"
    ]
  },
  {
    question: "Что вам проще — придумать или выполнить? (Вопрос 22/30)",
    options: [
      "Придумать идею",
      "Реализовать план",
      "Организовать процесс",
      "Координировать других"
    ]
  },
  {
    question: "Как вы относитесь к изменениям? (Вопрос 23/30)",
    options: [
      "Люблю новое",
      "Принимаю постепенно",
      "С трудом привыкаю",
      "Избегаю перемен"
    ]
  },
  {
    question: "Как вы оцениваете успех проекта? (Вопрос 24/30)",
    options: [
      "Если все довольны",
      "Если всё по плану",
      "Если было интересно",
      "Если был рост и опыт"
    ]
  },
  {
    question: "Что вам больше подходит? (Вопрос 25/30)",
    options: [
      "Создавать",
      "Руководить",
      "Анализировать",
      "Помогать"
    ]
  },
  {
    question: "Как вы действуете при неудаче? (Вопрос 26/30)",
    options: [
      "Учусь и пробую снова",
      "Разочаровываюсь, но двигаюсь дальше",
      "Долго переживаю",
      "Бросаю и иду дальше"
    ]
  },
  {
    question: "Что приносит вам больше удовольствия? (Вопрос 27/30)",
    options: [
      "Решать сложные задачи",
      "Общаться и помогать людям",
      "Создавать что-то новое",
      "Достигать целей и признания"
    ]
  },
  {
    question: "Как вы предпочитаете планировать день? (Вопрос 28/30)",
    options: [
      "Чётко по расписанию",
      "По настроению",
      "Импровизирую",
      "Ставлю минимум, но выполняю точно"
    ]
  },
  {
    question: "Какая работа вас точно не устроит? (Вопрос 29/30)",
    options: [
      "Скучная и однообразная",
      "Слишком стрессовая",
      "Без общения",
      "Без развития"
    ]
  },
  {
    question: "Как вы представляете идеальную профессию? (Вопрос 30/30)",
    options: [
      "Интересная и гибкая",
      "С высокой оплатой",
      "Со смыслом и пользой",
      "С престижем и перспективой"
    ]
  }
];

let currentQ = 0;
let answers = Array(questions.length).fill(null);

// Скрытие героя и показ теста
startBtn.addEventListener('click', () => {
  heroSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  heroSection.style.opacity = '0';
  heroSection.style.transform = 'translateY(-40px)';
  setTimeout(() => {
    heroSection.style.display = 'none';
    showQuestion(currentQ);
    testContainer.style.display = 'flex';
    testContainer.classList.add('visible');
  }, 600);
});

// Плавная смена вопроса
function showQuestion(index, direction = 'forward') {
  // --- если вопросы закончились ---
  if (index >= questions.length) {
    showResults(); // отдельная функция, см. ниже
    return;
  }

  const q = questions[index];

  // плавное исчезновение старого вопроса
  testContainer.classList.remove('fade-in');
  testContainer.classList.add('fade-out');

  setTimeout(() => {
    questionText.textContent = q.question;
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      if (answers[index] === i) btn.classList.add('selected');
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        answers[index] = i;
        Array.from(optionsContainer.children).forEach(c => c.classList.remove('selected'));
        btn.classList.add('selected');
        nextBtn.disabled = false; // активируем "Следующий"
      });

      optionsContainer.appendChild(btn);
    });

    // если ответ не выбран — кнопка "Следующий" неактивна
    nextBtn.disabled = answers[index] === null;

    // === Меняем текст кнопки в зависимости от вопроса ===
    if (index === questions.length - 1) {
      nextBtn.textContent = "Закончить ✅";
    } else {
      nextBtn.textContent = "Следующий вопрос ➡️";
    }

    // === Прячем/показываем кнопку "Назад" ===
    const nav = document.querySelector('.test-nav');
    if (index === 0) {
      prevBtn.style.display = 'none';
      nav.classList.remove('double');
      nav.classList.add('single');
    } else {
      prevBtn.style.display = 'inline-flex';
      nav.classList.remove('single');
      nav.classList.add('double');
    }

    testContainer.classList.remove('fade-out');
    testContainer.classList.add('fade-in');
  }, 300);
}

let hasRated = false; // флаг, чтобы нельзя было оставить оценку больше 1 раза

// Категории опций для каждого вопроса
// creative = творческая, analytic = аналитическая, practical = практическая
// Категории опций для 30 вопросов
const optionCategories = [
  // 1-10
  ["analytic","creative","practical","communicative"], // 1
  ["practical","creative","analytic","entrepreneurial"], // 2
  ["practical","technical","analytic","creative"],      // 3
  ["creative","communicative","practical","technical"], // 4
  ["analytic","creative","practical","entrepreneurial"],// 5
  ["creative","analytic","technical","practical"],      // 6
  ["analytic","creative","practical","technical"],      // 7
  ["practical","creative","communicative","entrepreneurial"], // 8
  ["practical","analytic","creative","technical"],      // 9
  ["creative","creative","practical","technical"],      // 10

  // 11-20
  ["creative","analytic","practical","entrepreneurial"], // 11
  ["practical","creative","analytic","technical"],       // 12
  ["analytic","creative","practical","technical"],       // 13
  ["creative","communicative","practical","technical"],  // 14
  ["analytic","practical","creative","technical"],       // 15
  ["practical","creative","technical","entrepreneurial"],// 16
  ["creative","analytic","practical","communicative"],   // 17
  ["practical","creative","analytic","entrepreneurial"], // 18
  ["analytic","practical","creative","technical"],       // 19
  ["creative","analytic","practical","communicative"],   // 20

  // 21-30
  ["practical","creative","analytic","technical"],       // 21
  ["creative","practical","analytic","entrepreneurial"], // 22
  ["analytic","creative","practical","technical"],       // 23
  ["creative","analytic","practical","entrepreneurial"], // 24
  ["practical","creative","analytic","technical"],       // 25
  ["creative","analytic","practical","communicative"],   // 26
  ["analytic","practical","creative","technical"],       // 27
  ["creative","practical","analytic","entrepreneurial"], // 28
  ["practical","creative","analytic","technical"],       // 29
  ["creative","analytic","practical","communicative"],   // 30
];

// ======== Функция показа результатов ========
function showResults() {
  const counts = { 
  creative: 0, 
  analytic: 0, 
  practical: 0,
  communicative: 0,
  technical: 0,
  entrepreneurial: 0
};

  answers.forEach((ans, i) => {
  const cat = optionCategories[i][ans] || "practical";
  counts[cat]++;
});

  const total = answers.length;
const percentages = {};
for (const key in counts) {
  percentages[key] = Math.round((counts[key] / total) * 100);
}

const bestMatchKey = Object.keys(percentages).reduce((a, b) =>
  percentages[a] >= percentages[b] ? a : b
);

const bestTexts = {
  creative: "творческих профессий (дизайнер, маркетолог, иллюстратор)",
  analytic: "аналитических сфер (программист, инженер, аналитик)",
  practical: "практических направлений (строитель, механик, техник)",
  communicative: "коммуникативных профессий (менеджер, PR, преподаватель)",
  technical: "технических сфер (IT-специалист, инженер-электроник)",
  entrepreneurial: "предпринимательских направлений (стартапер, руководитель, бизнесмен)"
};

const bestMatch = bestTexts[bestMatchKey];

  testContainer.innerHTML = `
    <div class="results-wrapper">
      <div class="results-panel">
        <div class="test-complete">🎓 ТВОЙ РЕЗУЛЬТАТ</div>
        <p class="result-text">Ты больше подходишь для <b>${bestMatch}</b> — круто, что прошёл(а) тест!</p>
       <div class="progress-wrapper">
  <div class="progress-item">
    <span>Творческая сфера</span>
    <div class="progress-bar"><div class="fill" style="width: ${percentages.creative}%"></div></div>
    <span>${percentages.creative}%</span>
  </div>
  <div class="progress-item">
    <span>Аналитическая сфера</span>
    <div class="progress-bar"><div class="fill" style="width: ${percentages.analytic}%"></div></div>
    <span>${percentages.analytic}%</span>
  </div>
  <div class="progress-item">
    <span>Практическая сфера</span>
    <div class="progress-bar"><div class="fill" style="width: ${percentages.practical}%"></div></div>
    <span>${percentages.practical}%</span>
  </div>
  <div class="progress-item">
    <span>Коммуникативная сфера</span>
    <div class="progress-bar"><div class="fill" style="width: ${percentages.communicative}%"></div></div>
    <span>${percentages.communicative}%</span>
  </div>
  <div class="progress-item">
    <span>Техническая сфера</span>
    <div class="progress-bar"><div class="fill" style="width: ${percentages.technical}%"></div></div>
    <span>${percentages.technical}%</span>
  </div>
  <div class="progress-item">
    <span>Предпринимательская сфера</span>
    <div class="progress-bar"><div class="fill" style="width: ${percentages.entrepreneurial}%"></div></div>
    <span>${percentages.entrepreneurial}%</span>
  </div>
</div>

        <div class="results-actions">
          <button id="restartTestBtn" class="btn btn-restart">🔄 Пройти заново</button>
          <button id="rateTestBtn" class="btn">⭐ Оценить тест</button>
        </div>
      </div>

      <div class="rate-panel">
        <h3>Оцени тест 🌟</h3>

        <!-- Имя -->
        <input type="text" id="username" placeholder="Имя" maxlength="20">

        <!-- Возраст -->
        <input type="number" id="age" placeholder="Возраст" min="1" max="99" oninput="if(this.value.length>2)this.value=this.value.slice(0,2)">

        <!-- Звёзды -->
        <div class="stars">
          <img src="/static/icon-star.png" class="star" data-value="1">
          <img src="/static/icon-star.png" class="star" data-value="2">
          <img src="/static/icon-star.png" class="star" data-value="3">
          <img src="/static/icon-star.png" class="star" data-value="4">
          <img src="/static/icon-star.png" class="star" data-value="5">
        </div>

        <!-- Отзыв -->
        <textarea id="feedback" placeholder="Оставь отзыв (до 30 символов)" maxlength="30"></textarea>

        <!-- Кнопка -->
        <button id="submitFeedback" class="btn">📩 Отправить отзыв</button>
      </div>
    </div>
  `;
  
  const ageSelect = document.getElementById('age');
  for (let i = 1; i <= 99; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    ageSelect.appendChild(option);
  }


  const rateTestBtn = document.getElementById("rateTestBtn");
  const restartBtn = document.getElementById("restartTestBtn");
  const ratePanel = document.querySelector(".rate-panel");
  const resultsPanel = document.querySelector(".results-panel");
  const stars = document.querySelectorAll(".star");
  const submitBtn = document.getElementById("submitFeedback");

  const gap = 2;
  const panelWidth = 400;
  let rating = 0;

  // ===== Оценка теста =====
  rateTestBtn.onclick = () => {
    if (hasRated) {
      showNotification("Ты уже оставил(а) оценку за этот прогон ⭐", 3000);
      return;
    }
    ratePanel.style.opacity = "1";
    ratePanel.style.pointerEvents = "auto";

    const shift = panelWidth/1.4 + gap/1.4; 
    resultsPanel.style.transform = `translateX(-${shift}px)`;
    ratePanel.style.transform = `translateX(${shift}px)`;
  };

  // ===== Логика звезд =====
  stars.forEach(star => {
    star.onclick = () => {
      rating = star.dataset.value;
      stars.forEach(s => s.classList.remove("active"));
      for (let i = 0; i < rating; i++) stars[i].classList.add("active");
    };
  });

  // ===== Отправка отзыва =====
  submitBtn.onclick = () => {
  const name = document.getElementById("username").value.trim();
  const age = document.getElementById("age").value;
  const feedbackText = document.getElementById("feedback").value.trim();
  const rating = Array.from(document.querySelectorAll(".star.active")).length;

  if (!name || !age || rating === 0) {
    showNotification("Заполни все поля и выбери звёзды ⭐", 3000);
    return;
  }

  // данные для отправки на сервер
  const data = {
    name: name,
    age: age,
    score: rating,
    feedback: feedbackText,
    answers: answers
  };

  fetch("/submit_feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: localStorage.setItem('lastFeedback', JSON.stringify(data))
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === "ok") {
        showNotification(`Спасибо, ${name}! Ты оставил отзыв ⭐`, 4000);
        hasRated = true;
        ratePanel.style.opacity = "0";
        ratePanel.style.pointerEvents = "none";
        resultsPanel.style.transform = "translateX(0)";
        // добавляем карточку в карусель на месте
        addCarouselCard(localStorage.setItem('lastFeedback', JSON.stringify(data)));
      } else {
        showNotification(`Спасибо, ${name}! Ты оставил отзыв ⭐`, 4000);
      }
    })
    .catch(() => showNotification(`Спасибо, ${name}! Ты оставил отзыв ⭐`, 4000));
};

  // ===== Перезапуск теста =====
restartBtn.onclick = () => {
  location.reload(); // перезагружает страницу полностью
};
}

// Навигация
nextBtn.addEventListener('click', () => {
  if (answers[currentQ] === null) return; // нельзя без выбора
  currentQ++;
  showQuestion(currentQ);
});

prevBtn.addEventListener('click', () => {
  if (currentQ > 0) {
    currentQ--;
    showQuestion(currentQ, 'backward');
  }
});

function showNotification(text, duration = 3000) {
  const notif = document.createElement("div");
  notif.className = "site-notification";
  notif.textContent = text;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add("show"), 50);
  setTimeout(() => notif.classList.remove("show"), duration);
  setTimeout(() => notif.remove(), duration + 300);
}


const ageSelect = document.getElementById('age');
for (let i = 1; i <= 99; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = i;
  // ageSelect.appendChild(option);
}

// Загружаем все предыдущие отзывы
function loadCarousel() {
  fetch("/get_results")
    .then(res => res.json())
    .then(data => {
      const track = document.getElementById("carousel-track");
      track.innerHTML = ""; // очищаем старые карточки
      data.results.forEach(user => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        card.innerHTML = `
          <h3>${user.name}, ${user.age}</h3>
          <p>Оценка: ${user.score}⭐</p>
          <p>Ответы: ${user.answers.join(", ")}</p>
          <p>Отзыв: ${user.feedback || "-"}</p>
        `;
        track.appendChild(card);
      });
    });
}

// function addCarouselCard(user) {
//   const track = document.getElementById("carousel-track");
//   const card = document.createElement("div");
//   card.className = "carousel-card";
//   card.innerHTML = `
//     <h3>${user.name}, ${user.age} лет</h3>
//     <p>Оценка: ${user.score}⭐</p>
//     <p>Отзывы: ${user.feedback}</p>
//     <p>Ответы: ${user.answers.map((a,i)=>`В${i+1}:${a}`).join(", ")}</p>
//   `;
//   track.appendChild(card);
// }

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  fetch("/get_results")
    .then(res => res.json())
    .then(data => {
      const results = data.results || [];
      console.log(`Загружено ${results.length} карточек:`);

      results.forEach(user => {
        console.log(`- ${user.name}, оценка: ${user.score}`);
        const card = document.createElement("div");
        card.className = "card"; // класс как в CSS

        // подсветка 5 звезд
        if (user.score == 5) card.classList.add("highlight");

        // создаём звезды
        let starsHtml = "";
        for (let i = 0; i < 5; i++) {
          starsHtml += `<img src="/static/icon-star.png" style="opacity:${i < user.score ? 1 : 0.3}">`;
        }

        card.innerHTML = `
          <div class="name">${user.name}</div>
          <div class="age">Возраст: ${user.age}</div>
          <div class="stars">${starsHtml}</div>
          <div class="comment">${user.feedback || ""}</div>
        `;
        track.appendChild(card);
      });
    })
    .catch(err => console.error(err));
});

// ======== БЕСКОНЕЧНАЯ ПЛАВНАЯ КАРУСЕЛЬ ========
function startInfiniteCarousel() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  const cards = Array.from(track.children);
  if (cards.length < 2) return;

  const gap = 24; // отступ между карточками (тот же, что в CSS)
  const speed = 0.3; // скорость (чем выше — тем быстрее)
  let isPaused = false;

  // Дублируем карточки, чтобы сделать зацикливание
  track.innerHTML += track.innerHTML;

  let offset = 0;

  function animate() {
    if (!isPaused) {
      offset -= speed;

      // когда уходим слишком далеко — возвращаем смещение
      const firstCard = track.children[0];
      const cardWidth = firstCard.offsetWidth + gap;
      if (Math.abs(offset) >= cardWidth * cards.length) {
        offset = 0;
      }

      track.style.transform = `translateX(${offset}px)`;
    }

    requestAnimationFrame(animate);
  }

  // при наведении — пауза
  track.addEventListener("mouseenter", () => (isPaused = true));
  track.addEventListener("mouseleave", () => (isPaused = false));

  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(startInfiniteCarousel, 1000);
});

// ======== ЭФФЕКТ ВЗРЫВА ЭМОДЗИ ПРИ ВЫБОРЕ ОПЦИИ ========
function createEmojiBurst(x, y) {
  const emojis = ["🌟", "🔥", "💥", "✨", "🎉", "😎", "🌈", "💫", "❤️", "🚀"];
  const count = 7; // сколько эмодзи вылетает
  for (let i = 0; i < count; i++) {
    const emoji = document.createElement("span");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.className = "emoji-burst";
    emoji.style.position = "absolute"; // важно, чтобы позиционировались на странице
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;
    emoji.style.fontSize = `${18 + Math.random() * 10}px`;
    emoji.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(emoji);

    const dx = (Math.random() - 0.5) * 160; // разброс
    const dy = (Math.random() - 1) * 160;
    const duration = 700 + Math.random() * 400;

    emoji.animate([
      { transform: `translate(0, 0) scale(1)`, opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
    ], {
      duration: duration,
      easing: "ease-out"
    });

    setTimeout(() => emoji.remove(), duration);
  }
}

// ======== ПРИ КЛИКЕ НА ВАРИАНТ В ТЕСТЕ ========
document.addEventListener("click", e => {
  if (e.target.classList.contains("option-btn")) {
    // Используем координаты клика внутри документа
    const x = e.pageX;
    const y = e.pageY;
    createEmojiBurst(x, y);
  }
});
