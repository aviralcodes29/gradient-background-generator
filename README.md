# 🎨 Gradient Background Generator

Advanced CSS gradient generator built with HTML, CSS & Vanilla JavaScript.  
Create **linear, radial, and conic** gradients with **multiple color stops**, presets, and one‑click CSS copy.

> Made by **Aviral Singh (@aviralcodes29)**

---

## ✨ Features

- **Multiple gradient types**
  - Linear gradients with custom angle (0–360°)
  - Radial gradients (circle)
  - Conic gradients with starting angle

- **Multi color stops**
  - Add up to **5 color stops**
  - Control **position (0–100%)** for each stop
  - Remove stops while keeping at least 2

- **Angle controls**
  - Slider + numeric input for precise angles
  - Live angle value display

- **Hex + color picker sync**
  - Color inputs and hex text fields stay in sync
  - Validates hex values before applying

- **Presets**
  - Ready‑made gradient presets inspired by modern UI designs
  - One click to load a preset (type, angle, and stops)

- **Utility actions**
  - 🎲 Random gradient generator (random type, angle, and colors)
  - ♻️ Reset button to go back to the default gradient
  - 📋 Copy CSS button to copy the `background` property

---

## 🖼 Screenshots

> Add your own screenshots to make this section shine. Example filenames:

- `screenshots/gradient-generator-linear.png` – Linear gradient with 3 color stops  
- `screenshots/gradient-generator-conic.png` – Conic gradient with multiple stops  
- `screenshots/gradient-generator-mobile.png` – Mobile view

```html
<!-- Example snippet for GitHub README (Markdown) -->
<!-- Replace these with actual image links in your repo: -->




```

---

## 🚀 Live Demo

You can host this easily with **GitHub Pages**:

1. Push the project to GitHub as  
   `https://github.com/aviralcodes29/gradient-background-generator`
2. In the repo settings, enable **GitHub Pages** → Source: `main` → `/root`
3. Your app will be available at:  
   `https://aviralcodes29.github.io/gradient-background-generator`

---

## 🛠️ Tech Stack

- **HTML5** – Semantic structure  
- **CSS3** – Custom UI, layout, responsive design  
- **Vanilla JavaScript (ES6+)** – Gradient logic, state management, DOM updates

No frameworks, no build tools – just pure frontend fundamentals.

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aviralcodes29/gradient-background-generator.git
cd gradient-background-generator
```

### 2. Open in browser

Just open `index.html` in your browser:

- Double‑click `index.html`, or  
- Use a Live Server extension in VS Code

---

## 💡 How to Use

1. **Choose gradient type**
   - Select **Linear**, **Radial**, or **Conic** from the dropdown.

2. **Adjust angle (for linear/conic)**
   - Use the **slider** or **number input** to set angle (0–360°).

3. **Configure color stops**
   - Use color pickers or hex inputs for Color 1 & Color 2.
   - Add more stops with **“+ Add Stop”**.
   - Move positions with the range slider (0–100%).
   - Remove stops with the **Remove** button (keeps at least 2).

4. **Use presets**
   - Click any preset swatch to instantly load a nice gradient.

5. **Copy CSS**
   - Click **“Copy CSS”** to copy the `background` property.
   - Paste it into your CSS file (`background: linear-gradient(...);`).

6. **Random / Reset**
   - **Random Gradient**: generates a random type, angle, and two colors.
   - **Reset**: returns to the default gradient configuration.

---

## 🧠 What I Learned

Working on this project helped practice:

- Managing **state** in vanilla JS (array of color stops)
- Using **dynamic DOM rendering** for lists (color stop rows, presets)
- Synchronizing **range + number + color + hex inputs**
- Building a small tool that feels like real designer utilities (CSSGradient, Colorffy, etc.)

---

## 🔮 Possible Improvements

Ideas for future versions:

- Export as full CSS snippet (with class selector)
- Export as **CSS variables** or Tailwind‑like utilities
- Support for different radial shapes (circle / ellipse)
- Option to save custom presets to `localStorage`
- Dark/light theme toggle for the UI itself

---

## 👤 Author

**Aviral Singh**  
B.Tech CSE (AI/ML)  

- GitHub: [@aviralcodes29](https://github.com/aviralcodes29)
- LinkedIn: *(add your link here if you want)*
- Email: *(optional)*

---

If you like this project, feel free to **star** ⭐ the repo or fork it and build your own version!