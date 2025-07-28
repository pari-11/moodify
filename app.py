from flask import Flask, render_template, request, jsonify
import joblib
import random

app = Flask(__name__)

# Load your trained model and scaler
model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')

# Song mapping for each mood with both "sit" and "uplift" songs
song_map = {
  "joyful": {
      "sit": [
    {
      "title": "Be Sweet",
      "artist": "Japanese Breakfast",
      "link": "https://open.spotify.com/track/1R5Q54dvT30p4fl0zlgExm",
      "embed": "<iframe src='https://open.spotify.com/embed/track/1R5Q54dvT30p4fl0zlgExm' width='300' height='80' frameborder='0'></iframe>"
    },
    {
      "title": "Days Like These",
      "artist": "The Cat Empire",
      "link": "https://open.spotify.com/track/0W1TTDGJkOF0rVvXEU0m9y",
      "embed": "<iframe src='https://open.spotify.com/embed/track/0W1TTDGJkOF0rVvXEU0m9y' width='300' height='80' frameborder='0'></iframe>"
    }
  ],
  "uplift": [
    {
      "title": "Tongue Tied",
      "artist": "Grouplove",
      "link": "https://open.spotify.com/track/6ZVZxHAjNhQKDxDtkMkAuN",
      "embed": "<iframe src='https://open.spotify.com/embed/track/6ZVZxHAjNhQKDxDtkMkAuN' width='300' height='80' frameborder='0'></iframe>"
    },
    {
      "title": "Now That I Found You",
      "artist": "Carly Rae Jepsen",
      "link": "https://open.spotify.com/track/0r3cRS3v0EHspTMcqFZcIr",
      "embed": "<iframe src='https://open.spotify.com/embed/track/0r3cRS3v0EHspTMcqFZcIr' width='300' height='80' frameborder='0'></iframe>"
    },
    {
      "title": "Roller Coaster",
      "artist": "Bleachers",
      "link": "https://open.spotify.com/track/4bB2jewc6mtQXcD7SYnjcX",
      "embed": "<iframe src='https://open.spotify.com/embed/track/4bB2jewc6mtQXcD7SYnjcX' width='300' height='80' frameborder='0'></iframe>"
    }
    ]
  },
  "content": {
  "sit": [
    {"title": "It’s OK I’m Ok", "artist": "Tate McRae", "link": "https://open.spotify.com/track/3I1hCXXAetRnAb0k8otdQ8", "embed": "<iframe src='https://open.spotify.com/embed/track/3I1hCXXAetRnAb0k8otdQ8' width='300' height='80' frameborder='0'></iframe>"}
  ],
  "uplift": [
    {"title": "Grow", "artist": "Conan Gray", "link": "https://open.spotify.com/track/3T4K4CbF1v0MgXnjc3drqI", "embed": "<iframe src='https://open.spotify.com/embed/track/3T4K4CbF1v0MgXnjc3drqI' width='300' height='80' frameborder='0'></iframe>"}
  ]
},
  "neutral": {
  "sit": [
    {
      "title": "Light On",
      "artist": "Maggie Rogers",
      "link": "https://open.spotify.com/track/6UnCGAEmrbGIOSmGRZQ1M2",
      "embed": "<iframe src='https://open.spotify.com/embed/track/6UnCGAEmrbGIOSmGRZQ1M2' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
    },
    {
      "title": "She Likes Spring, I Prefer Winter",
      "artist": "slchld",
      "link": "https://open.spotify.com/track/6bM1QYzUKzZpQyAa7uO5kr",
      "embed": "<iframe src='https://open.spotify.com/embed/track/6bM1QYzUKzZpQyAa7uO5kr' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted‑media'></iframe>"
    },
    {
      "title": "Alone With You",
      "artist": "Arlie",
      "link": "https://open.spotify.com/search/Alone%20With%20You%20Arlie",
      "embed": "<iframe src='https://open.spotify.com/embed/track/search%3AAlone%20With%20You%20Arlie' width='300' height='80' frameborder='0'></iframe>"
    }
  ],
  "uplift": [
    {
      "title": "Supercuts",
      "artist": "Jeremy Zucker",
      "link": "https://open.spotify.com/track/4PyMK7JTcu6l30D8KogokR",
      "embed": "<iframe src='https://open.spotify.com/embed/track/4PyMK7JTcu6l30D8KogokR' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted‑media'></iframe>"
    },
    {
      "title": "Are You Bored Yet?",
      "artist": "Wallows ft. Clairo",
      "link": "https://open.spotify.com/search/Are%20You%20Bored%20Yet%20Wallows%20Clairo",
      "embed": "<iframe src='https://open.spotify.com/embed/track/search%3AAre%20You%20Bored%20Yet%20Wallows%20Clairo' width='300' height='80' frameborder='0'></iframe>"
    },
    {
      "title": "Midnight City",
      "artist": "M83",
      "link": "https://open.spotify.com/search/Midnight%20City%20M83",
      "embed": "<iframe src='https://open.spotify.com/embed/track/search%3AMidnight%20City%20M83' width='300' height='80' frameborder='0'></iframe>"
    }
  ]
},
  "meh": {
  "sit": [
    {"title": "Lover is a Day", "artist": "Cuco", "link": "https://open.spotify.com/track/7wEPl67F7L5QDYDbmSKXpY", "embed": "<iframe src='https://open.spotify.com/embed/track/7wEPl67F7L5QDYDbmSKXpY' width='300' height='80' frameborder='0'></iframe>"},
    {"title": "It’s Called: Freefall", "artist": "Rainbow Kitten Surprise", "link": "https://open.spotify.com/track/3mwDfaVvuwZwhXdpsv1p9r", "embed": "<iframe src='https://open.spotify.com/embed/track/3mwDfaVvuwZwhXdpsv1p9r' width='300' height='80' frameborder='0'></iframe>"},
    {"title": "The Suburbs", "artist": "Arcade Fire", "link": "https://open.spotify.com/track/6f1yWhN4rWB3X4iN0cjWxi", "embed": "<iframe src='https://open.spotify.com/embed/track/6f1yWhN4rWB3X4iN0cjWxi' width='300' height='80' frameborder='0'></iframe>"}
  ],
  "uplift": [
    {"title": "Bags", "artist": "Clairo", "link": "https://open.spotify.com/track/3p2LyUo1V0Ngnf0HZyyuZ4", "embed": "<iframe src='https://open.spotify.com/embed/track/3p2LyUo1V0Ngnf0HZyyuZ4' width='300' height='80' frameborder='0'></iframe>"},
    {"title": "Mind Over Matter (Acoustic)", "artist": "Young the Giant", "link": "https://open.spotify.com/track/0q5GGgRNXUpbnTOHgSmVuA", "embed": "<iframe src='https://open.spotify.com/embed/track/0q5GGgRNXUpbnTOHgSmVuA' width='300' height='80' frameborder='0'></iframe>"}
  ]
},
  "emotionally tired": {
    "sit": [
      {
        "title": "Liability",
        "artist": "Lorde",
        "link": "https://open.spotify.com/track/2nGFzvICaeEWjIrBrL2RAx",
        "embed": "<iframe src='https://open.spotify.com/embed/track/2nGFzvICaeEWjIrBrL2RAx' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ],
    "uplift": [
      {
        "title": "Shake It Out",
        "artist": "Florence + The Machine",
        "link": "https://open.spotify.com/track/0rkCcsZzj4bGGaAynEwOtF",
        "embed": "<iframe src='https://open.spotify.com/embed/track/0rkCcsZzj4bGGaAynEwOtF' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ]
  },
  "low energy": {
  "sit": [
    {"title": "Sleepwalking", "artist": "All Time Low", "link": "https://open.spotify.com/track/1YimOTr6viipQYBkDhbXWm", "embed": "<iframe src='https://open.spotify.com/embed/track/1YimOTr6viipQYBkDhbXWm' width='300' height='80' frameborder='0'></iframe>"},
    {"title": "Backyard Boy", "artist": "Claire Rosinkranz", "link": "https://open.spotify.com/track/0mY7NeKohAoaHK6TZDkFCp", "embed": "<iframe src='https://open.spotify.com/embed/track/0mY7NeKohAoaHK6TZDkFCp' width='300' height='80' frameborder='0'></iframe>"}
  ],
  "uplift": [
    {"title": "Lately", "artist": "Forrest.", "link": "https://open.spotify.com/track/45UJJiKqf1ewmlEFBDZprT", "embed": "<iframe src='https://open.spotify.com/embed/track/45UJJiKqf1ewmlEFBDZprT' width='300' height='80' frameborder='0'></iframe>"},
    {"title": "This Side of Paradise", "artist": "Coyote Theory", "link": "https://open.spotify.com/track/3rzz8KrJcAGd2IL7LGEVnB", "embed": "<iframe src='https://open.spotify.com/embed/track/3rzz8KrJcAGd2IL7LGEVnB' width='300' height='80' frameborder='0'></iframe>"}
  ]
},
  "overwhelmed": {
  "sit": [
    {
      "title": "Overwhelmed",
      "artist": "Royal & the Serpent",
      "link": "https://open.spotify.com/track/5jjZikDrEd0by1o7V3fO4y",
      "embed": "<iframe src='https://open.spotify.com/embed/track/5jjZikDrEd0by1o7V3fO4y' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
    },
    {
      "title": "Numb",
      "artist": "Men I Trust",
      "link": "https://open.spotify.com/search/Numb%20Men%20I%20Trust",
      "embed": "<iframe src='https://open.spotify.com/embed/track/search%3ANumb%20Men%20I%20Trust' width='300' height='80' frameborder='0'></iframe>"
    },
    {
      "title": "Line Without a Hook",
      "artist": "Ricky Montgomery",
      "link": "https://open.spotify.com/search/Line%20Without%20a%20Hook%20Ricky%20Montgomery",
      "embed": "<iframe src='https://open.spotify.com/embed/track/search%3ALine%20Without%20a%20Hook%20Ricky%20Montgomery' width='300' height='80' frameborder='0'></iframe>"
    },
    {
      "title": "Hard Sometimes",
      "artist": "Ruel",
      "link": "https://open.spotify.com/search/Hard%20Sometimes%20Ruel",
      "embed": "<iframe src='https://open.spotify.com/embed/track/search%3AHard%20Sometimes%20Ruel' width='300' height='80' frameborder='0'></iframe>"
    }
  ],
  "uplift": [
    {
      "title": "Highs & Lows",
      "artist": "Prinz, Gabriela Bee",
      "link": "https://open.spotify.com/track/1jrjUPWrfMw8RBbZ9PlX0W",
      "embed": "<iframe src='https://open.spotify.com/embed/track/1jrjUPWrfMw8RBbZ9PlX0W' width='300' height='80' frameborder='0'></iframe>"
    }
  ]
},
  "hopeful": {
    "sit": [
      {
        "title": "The Night We Met",
        "artist": "Lord Huron",
        "link": "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a",
        "embed": "<iframe src='https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ],
    "uplift": [
      {
        "title": "On Top of the World",
        "artist": "Imagine Dragons",
        "link": "https://open.spotify.com/track/3jksrXcfz2QwrU8EcrgXj3",
        "embed": "<iframe src='https://open.spotify.com/embed/track/3jksrXcfz2QwrU8EcrgXj3' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ]
  },
  "struggling": {
    "sit": [
      {
        "title": "Unwell",
        "artist": "Matchbox Twenty",
        "link": "https://open.spotify.com/track/0lmedbQ3r0CzB3FiPoFKhx",
        "embed": "<iframe src='https://open.spotify.com/embed/track/0lmedbQ3r0CzB3FiPoFKhx' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ],
    "uplift": [
      {
        "title": "Keep Your Head Up",
        "artist": "Andy Grammer",
        "link": "https://open.spotify.com/track/3G9zWMP0DmgU1yupq8fzW5",
        "embed": "<iframe src='https://open.spotify.com/embed/track/3G9zWMP0DmgU1yupq8fzW5' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ]
  },
  "burnt out": {
    "sit": [
      {
        "title": "Motion Sickness",
        "artist": "Phoebe Bridgers",
        "link": "https://open.spotify.com/track/5xo8RrjJ9CVNrtRg2S3B1R",
        "embed": "<iframe src='https://open.spotify.com/embed/track/5xo8RrjJ9CVNrtRg2S3B1R' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      },
      {
        "title": "This Is On You",
        "artist": "Maisie Peters",
        "link": "https://open.spotify.com/track/2L86WPPzM86RI2Li8zua9y",
        "embed": "<iframe src='https://open.spotify.com/embed/track/2L86WPPzM86RI2Li8zua9y' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      },
      {
        "title": "Half My Mind Ago",
        "artist": "Kathleen",
        "link": "https://open.spotify.com/track/3Pf5nSm667NEyPQ7fynyDk",
        "embed": "<iframe src='https://open.spotify.com/embed/track/3Pf5nSm667NEyPQ7fynyDk' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ],
    "uplift": [
      {
        "title": "Can I Call You Tonight?",
        "artist": "Dayglow",
        "link": "https://open.spotify.com/track/3E0tzk8lsiI3J02KG3Kca7",
        "embed": "<iframe src='https://open.spotify.com/embed/track/3E0tzk8lsiI3J02KG3Kca7' width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>"
      }
    ]
  }
};

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    answers = data.get("answers", [])

    if not answers or len(answers) != 5:
        return jsonify({"error": "Exactly 5 answers required."}), 400

    try:
        answers = [[float(x) for x in answers]]
        scaled_answers = scaler.transform(answers)
        prediction = model.predict(scaled_answers)
        mood = prediction[0]

        # Get song options for that mood
        songs = song_map.get(mood, {
            "sit": [],
            "uplift": []
        })

        # Randomly select one from each list using correct variable
        sit_song = random.choice(songs["sit"]) if songs["sit"] else {}
        uplift_song = random.choice(songs["uplift"]) if songs["uplift"] else {}

        return jsonify({
            "mood": mood,
            "songs": {
                "sit": sit_song,
                "uplift": uplift_song
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
