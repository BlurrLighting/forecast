# 🔮 Forecast 2026 - Blurr Lighting

Dashboard interactiv pentru urmărirea progresului proiectelor în 2026.

## 🚀 Cum să configurezi GitHub Pages (Pas cu Pas)

### **Pasul 1: Creează cont GitHub (GRATUIT)**

1. Mergi la [github.com](https://github.com)
2. Click pe **"Sign up"**
3. Completează:
   - Email
   - Parolă
   - Username (ex: `blurrlighting` sau `blurr2026`)
4. Verifică email-ul
5. ✅ Gata! Ai cont GitHub

---

### **Pasul 2: Creează Repository (Proiect)**

1. După login, click pe **"+"** (sus-dreapta) → **"New repository"**
2. Completează:
   - **Repository name**: `forecast-2026` (sau orice nume vrei)
   - **Description**: `Dashboard Forecast 2026 - Blurr Lighting`
   - **Public** (bifează - IMPORTANT pentru GitHub Pages gratuit)
   - ✅ Bifează **"Add a README file"**
3. Click **"Create repository"**

---

### **Pasul 3: Încarcă Fișierele**

#### **Metodă A: Prin Web (Simplu - Recomandat)**

1. În repository-ul tău, click pe **"Add file"** → **"Upload files"**
2. Trage cele 3 fișiere din folderul `github-pages`:
   - `index.html`
   - `app.js`
   - `blurr_logo.png`
3. Scrie un mesaj: "Initial commit - Forecast 2026 Dashboard"
4. Click **"Commit changes"**
5. ✅ Fișierele sunt încărcate!

#### **Metodă B: Prin Git (Avansat)**

```bash
# Clonează repository-ul
git clone https://github.com/USERNAME/forecast-2026.git
cd forecast-2026

# Copiază cele 3 fișiere aici

# Adaugă și commit
git add .
git commit -m "Initial commit - Forecast 2026 Dashboard"
git push
```

---

### **Pasul 4: Activează GitHub Pages**

1. În repository, mergi la **"Settings"** (tab-ul de sus)
2. Din meniul stânga, click pe **"Pages"**
3. Sub **"Source"**:
   - Branch: Selectează **"main"** (sau "master")
   - Folder: Lasă **"/ (root)"**
4. Click **"Save"**
5. ⏳ Așteaptă 1-2 minute
6. 🎉 Vei vedea un mesaj verde: 
   > "Your site is live at `https://USERNAME.github.io/forecast-2026/`"

---

### **Pasul 5: Accesează Dashboard-ul**

🌐 **URL-ul tău permanent:**
```
https://USERNAME.github.io/forecast-2026/
```

**Exemplu:**
- Dacă username-ul tău e `blurrlighting`
- URL-ul va fi: `https://blurrlighting.github.io/forecast-2026/`

✅ **Salvează acest link în bookmarks!**

---

## 📱 Cum să folosești Dashboard-ul

### **Adăugare Proiect:**
1. Completează formularul de jos
2. Apasă "Adaugă Proiect"
3. ✅ Graficele se actualizează automat!

### **Ștergere Proiect:**
1. Click pe 🗑️ lângă proiect
2. Confirmă
3. ✅ Gata!

### **Date Salvate Automat:**
- 💾 Proiectele se salvează în browser (LocalStorage)
- ✅ Rămân salvate chiar dacă închizi tab-ul
- 🌐 Accesibil de pe orice device la același URL

---

## 🔒 Date și Securitate

### **Unde sunt salvate datele?**
- 📱 **LocalStorage** în browser-ul tău
- ⚠️ **Per browser** - dacă schimbi browser sau device, datele nu se transferă automat

### **Cum să transferi datele între device-uri?**

**Opțiunea 1: Export/Import Manual**
- Browser 1: `localStorage` → Export JSON
- Browser 2: Import JSON → `localStorage`
- (Pot adăuga această funcționalitate dacă vrei)

**Opțiunea 2: Folosește același browser** 
- Chrome sync (dacă ești logat cu același cont Google)

---

## 🛠️ Modificări și Actualizări

### **Cum să actualizezi dashboard-ul:**

1. **Prin Web:**
   - Mergi în repository
   - Click pe fișierul care trebuie modificat
   - Click pe ✏️ (Edit)
   - Fă modificările
   - Click "Commit changes"
   - ⏳ Așteaptă 1-2 minute → site actualizat!

2. **Prin Git:**
   ```bash
   # Fă modificări în fișiere
   git add .
   git commit -m "Update dashboard"
   git push
   ```

---

## 🎯 Features Dashboard

✅ **Target 2026**: 300.000 EUR (1.500.000 RON)
✅ **4 Divizii**: AVL Installs, Arhitectural, Events, Contract Harvest
✅ **3 Grafice Interactive** cu Chart.js
✅ **Progress bar** în timp real
✅ **Salvare automată** în LocalStorage
✅ **Responsive** - funcționează pe mobile
✅ **Color scheme Blurr** - cyan, galben, roșu

---

## 📞 Suport

### **Probleme comune:**

**❓ "Site-ul nu se încarcă"**
- Verifică că ai activat GitHub Pages în Settings
- Așteaptă 2-3 minute după activare
- URL-ul corect: `https://USERNAME.github.io/REPO-NAME/`

**❓ "Am pierdut datele"**
- Au fost șterse în LocalStorage (cache browser șters)
- Soluție: Adaugă funcție de Export/Import backup

**❓ "Vreau să schimb ceva în design"**
- Editează `index.html` (HTML + CSS)
- Editează `app.js` (JavaScript)
- Push changes → site se actualizează automat

**❓ "Vreau acces de pe mai multe device-uri cu date sincronizate"**
- Contactează-mă pentru versiune cu backend (Firebase/Supabase)

---

## 🎨 Customizare

### **Schimbă Target-ul:**
În `app.js`, linia 2-3:
```javascript
const TARGET_EUR = 300000;  // Schimbă aici
const TARGET_RON = 1500000; // Sau aici
```

### **Schimbă Cursul EUR/RON:**
În `app.js`, linia 1:
```javascript
const EURO_TO_RON = 5.0; // Schimbă aici
```

---

## 📄 Licență

© 2026 Blurr Lighting - Toate drepturile rezervate

---

**🎉 Succes cu proiectele din 2026!**
