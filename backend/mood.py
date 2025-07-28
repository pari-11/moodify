import pandas as pd
import random

questions = [f"Q{i+1}" for i in range(41)]

mood_map = {
    (1.0, 1.5): "joyful",
    (1.5, 2.0): "content",
    (2.0, 2.3): "neutral",
    (2.3, 2.6): "meh",
    (2.6, 2.9): "emotionally tired",
    (2.9, 3.2): "low energy",
    (3.2, 3.5): "overwhelmed",
    (3.5, 3.8): "hopeful",
    (3.8, 4.0): "struggling",
    (4.0, 4.1): "burnt out"
}

def map_avg_to_mood(avg):
    for rng, mood in mood_map.items():
        if rng[0] <= avg < rng[1]:
            return mood
    return "neutral"

def generate_row_for_mood(target_mood):
    attempts = 0
    while attempts < 1000:  # Avoid infinite loop
        row = [0] * 41
        selected_qs = random.sample(range(41), 5)
        values = [random.randint(1, 4) for _ in range(5)]
        avg = sum(values) / 5
        mood = map_avg_to_mood(avg)
        if mood == target_mood:
            for idx, val in zip(selected_qs, values):
                row[idx] = val
            return row + [mood]
        attempts += 1
    return None

# Generate balanced dataset
samples_per_mood = 20000  # → 20000 x 10 = 200,000 rows total
data = []

for mood in list(mood_map.values()):
    print(f"Generating for mood: {mood}")
    count = 0
    while count < samples_per_mood:
        row = generate_row_for_mood(mood)
        if row:
            data.append(row)
            count += 1

# Save
df = pd.DataFrame(data, columns=questions + ["Mood"])
df.to_csv("balanced_mood_dataset.csv", index=False)
print("✅ Balanced dataset saved as balanced_mood_dataset.csv")
