# 🎯 Digit Challenge Game – React Based BODMAS Puzzle

The **Digit Challenge Game** is a fun and engaging math puzzle built using **React.js**, designed especially for **Capgemini Game-Based Aptitude** practice.  
Players solve level-based arithmetic problems following the **BODMAS** rule, with increasing difficulty as they progress.

---

## 🚀 Features
- **BODMAS Rule Based** questions for accurate math problem-solving.
- **Level-wise difficulty** – larger numbers & complex operations in higher levels.
- **Operator Rules:**
  - No negative results in early levels.
  - Both operators are always different in each question.
- **One-time digit usage** – once used, the digit disappears for that question.
- **Timer per question** – answer before the timer ends.
- **Overall Game Duration:** 6 minutes, after which the game ends.
- **Score System:** +10 points for each correct answer.
- **Live Stats:** Track correct & wrong answers in real-time.
- **Visual Feedback:**
  - Green button + “Correct” text for right answers.
  - Red button + “Wrong” text for wrong answers.
- **Game Over Popup** with final stats and option to restart.
- **Responsive UI** – works on desktop & mobile.

---

## 🛠 Tech Stack
- **Frontend:** React.js
- **Styling:** CSS3
- **Logic:** JavaScript (BODMAS evaluation using `eval`)

---

## 🎮 How to Play
1. Start the game – you’ll see a math **target** and blanks to fill with numbers.
2. Use the **keypad** to insert the correct numbers (each digit can only be used once).
3. Click **Submit** after filling all slots.
4. Get instant feedback:
   - ✅ Green = Correct
   - ❌ Red = Wrong
5. Continue to the next level until the **6-minute game timer** ends.
6. View your final score and stats in the **Game Over** popup.

---

## 📦 Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/digit-challenge-game.git
   cd digit-challenge-game
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy on GitHub Pages
1. Install GitHub Pages package:
   ```bash
   npm install gh-pages --save-dev
   ```
2. Add the following to your `package.json`:
   ```json
   "homepage": "https://your-username.github.io/digit-challenge-game",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy:
   ```bash
   npm run deploy
   ```

---

## 📌 Ideal For
- Students preparing for **Capgemini Game-Based Aptitude** tests.
- Math puzzle lovers.
- Quick mental math practice.

---

## 🖋 Author
**Khustar** – Passionate about building interactive learning tools and fun games.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
