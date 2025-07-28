import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, classification_report
import lightgbm as lgb
from sklearn.preprocessing import LabelEncoder


# Load dataset
df = pd.read_csv("balanced_mood_dataset.csv")

# Remove Mood=0 rows
df = df[df['Mood'] != 0]

# Separate features and target
X = df.drop("Mood", axis=1)
y = df["Mood"]

# Add high/low score counts
X['high_score_count'] = (X >= 4).sum(axis=1)
X['low_score_count'] = (X <= 2).sum(axis=1)

# Encode labels
le = LabelEncoder()
y = le.fit_transform(y)

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# Train model
model = lgb.LGBMClassifier(
    objective='multiclass',
    num_class=10,
    learning_rate=0.05,
    n_estimators=200,
    min_gain_to_split=0.1,
    verbosity=-1
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Accuracy: {accuracy * 100:.2f}%\n")
print("📊 Classification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# ✅ Predict on your custom input
mood_labels = [
    "joyful",
    "content",
    "neutral",
    "meh",
    "emotionally tired",
    "low energy",
    "overwhelmed",
    "hopeful",
    "struggling",
    "burnt out"
]

# Fit the LabelEncoder with your new labels
label_encoder = LabelEncoder()
label_encoder.fit(mood_labels)

# Sample input
sample = [0,4,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,4,4,0,0,0,3,0,0,0,0,0,0,0,0,0]
high_count = sum(1 for val in sample if val >= 4)
low_count = sum(1 for val in sample if val <= 2)
sample += [high_count, low_count]

# Preprocessing
sample_np = np.array(sample).reshape(1, -1)
sample_scaled = scaler.transform(sample_np)

# Prediction
pred = model.predict(sample_scaled)
predicted_class_index = int(pred[0])
predicted_mood = label_encoder.inverse_transform([predicted_class_index])[0]

# Display mood (add emojis or stylization if you want)
mood_display_names = {
    "joyful": "😄 Joyful",
    "content": "🙂 Content",
    "neutral": "😐 Neutral",
    "meh": "🙃 Meh",
    "emotionally tired": "😩 Emotionally Tired",
    "low energy": "😴 Low Energy",
    "overwhelmed": "🥴 Overwhelmed",
    "hopeful": "🌟 Hopeful",
    "struggling": "😓 Struggling",
    "burnt out": "🔥 Burnt Out"
}

# Final mood output
mood = mood_display_names.get(predicted_mood, predicted_mood)
print(f"\n🎵 Predicted Mood: {mood}")