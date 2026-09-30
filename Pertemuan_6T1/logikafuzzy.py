import tkinter as tk
from tkinter import messagebox

def calculate_score():
    try:
        # Get Nilai UTS, UAS, and Tugas from entries
        uts = float(entry_uts.get())
        uas = float(entry_uas.get())
        t1 = float(entry_t1.get())
        t2 = float(entry_t2.get())
        t3 = float(entry_t3.get())
        t4 = float(entry_t4.get())
        t5 = float(entry_t5.get())
        
        # Rata Rata Tugas
        mean_tugas = (t1 + t2 + t3 + t4 + t5) / 5
        
        final_score = (uts * 0.30) + (uas * 0.20) + (mean_tugas * 0.50)
        
        # Kategori Nilai Akhir
        if final_score >= 85:
            category = "A (Baik Sekali)"
        elif final_score >= 70:
            category = "B (Baik)"
        elif final_score >= 55:
            category = "C (Kurang)"
        elif final_score >= 40:
            category = "D (TIdak Lulus)"
        else:
            category = "E (Gagal)"
            
        
        result_label.config(text=f"Nilai Akhir: {final_score:.2f}\nKategori: {category}")
        
    except ValueError:
        
        messagebox.showerror("Input Error", "Please enter valid numbers in all fields.")

# --- UI SETUP ---
root = tk.Tk()
root.title("Pehitung Nilai Akhir Mahasiswa")
root.geometry("320x450")
root.config(padx=20, pady=20)


tk.Label(root, text="UTS Score (30%):", font=("Arial", 10, "bold")).grid(row=0, column=0, sticky="w", pady=5)
entry_uts = tk.Entry(root, width=15)
entry_uts.grid(row=0, column=1, pady=5)

tk.Label(root, text="UAS Score (20%):", font=("Arial", 10, "bold")).grid(row=1, column=0, sticky="w", pady=5)
entry_uas = tk.Entry(root, width=15)
entry_uas.grid(row=1, column=1, pady=5)

# Tugas Section Header
tk.Label(root, text="Tugas Scores (50% Mean):", font=("Arial", 10, "bold")).grid(row=2, column=0, columnspan=2, sticky="w", pady=(15, 5))

tk.Label(root, text="Tugas 1:").grid(row=3, column=0, sticky="w")
entry_t1 = tk.Entry(root, width=15)
entry_t1.grid(row=3, column=1, pady=2)

tk.Label(root, text="Tugas 2:").grid(row=4, column=0, sticky="w")
entry_t2 = tk.Entry(root, width=15)
entry_t2.grid(row=4, column=1, pady=2)

tk.Label(root, text="Tugas 3:").grid(row=5, column=0, sticky="w")
entry_t3 = tk.Entry(root, width=15)
entry_t3.grid(row=5, column=1, pady=2)

tk.Label(root, text="Tugas 4:").grid(row=6, column=0, sticky="w")
entry_t4 = tk.Entry(root, width=15)
entry_t4.grid(row=6, column=1, pady=2)

tk.Label(root, text="Tugas 5:").grid(row=7, column=0, sticky="w")
entry_t5 = tk.Entry(root, width=15)
entry_t5.grid(row=7, column=1, pady=2)

# Calculate Button
calc_btn = tk.Button(root, text="Hitung Kategori Akhir", command=calculate_score, bg="#4CAF50", fg="black")
calc_btn.grid(row=8, column=0, columnspan=2, pady=20, ipadx=10, ipady=5)

# Result Display
result_label = tk.Label(root, text="Nilai Akhir: --\nKategori: --", font=("Arial", 12, "bold"), fg="blue")
result_label.grid(row=9, column=0, columnspan=2)

# Run the application
root.mainloop()