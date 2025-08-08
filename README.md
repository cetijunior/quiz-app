# 📚 Quizzer – React Quiz App

A mobile-friendly quiz web application built with **React** and **Tailwind CSS**.  
Features multiple-choice questions, a countdown timer, progress tracking, and a results page with past scores stored in localStorage.

---

## 🚀 Features

- **Multiple Choice Questions** – Questions are shuffled each time.
- **Timer Per Question** – Auto-advances when time runs out.
- **Progress Tracking** – See how far you’ve gone in the quiz.
- **Responsive Design** – Works perfectly on mobile and desktop.
- **Results Page** – View your score, correct/wrong answers, and past results.
- **Local Storage** – Saves score history for reflection later.

---

## 📂 Project Structure

```
src/
  main.jsx               # React entry point
  App.jsx                # Main app + routes
  index.css              # Tailwind imports
  data/
    questions.js         # Quiz questions
  context/
    QuizContext.jsx      # State management
  utils/
    shuffle.js           # Shuffle helper
    storage.js           # LocalStorage helpers
  components/
    Layout.jsx
    ProgressBar.jsx
    Timer.jsx
    QuestionCard.jsx
  pages/
    Home.jsx
    Quiz.jsx
    Results.jsx
```

---

## 🛠 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/quizzer.git
   cd quizzer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Tailwind CSS**
   Follow the [Tailwind installation guide](https://tailwindcss.com/docs/guides/vite) for Vite.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 📄 How It Works

1. **Home Page**

   - Welcome message and "Start Quiz" button.

2. **Quiz Page**

   - Displays one question at a time.
   - Countdown timer for each question.
   - Click an answer to lock it in.
   - Progress bar shows question count.

3. **Results Page**
   - Shows your latest score and percentage.
   - Shows correct answers in **green** and wrong answers in **red** for review.
   - Lists your past scores with timestamps.

---

## 🖌 Customization

- **Edit Questions** – Modify `src/data/questions.js` to add or remove questions.
- **Time Limits** – Change `timeLimit` per question in the questions array.
- **Styling** – Tailwind classes can be adjusted in each component.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 💡 Future Improvements

- Category selection (e.g., General Knowledge, Programming, Science).
- Leaderboards with Firebase/Supabase.
- User accounts to track scores online.
- Question editor for adding new questions via the UI.

---

**Made with ❤️ using React + Tailwind CSS**

<!-- From CJ -->
