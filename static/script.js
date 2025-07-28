
        // Variables
        let animationComplete = false;

        // DOM elements
        const introScreen = document.getElementById('introScreen');
        const mainPage = document.getElementById('mainPage');
        const quizPage = document.getElementById('quizPage');
        const aboutPage = document.getElementById('aboutPage');
        const catContainer = document.getElementById('catContainer');
        const speechBubble = document.getElementById('speechBubble');
        const startButton = document.getElementById('startButton');
        const floatingCircles = document.getElementById('floatingCircles');
        const aboutLink = document.getElementById('aboutLink');
        const aboutHomeBtn = document.getElementById('aboutHomeBtn');
        
        // Quiz page elements
        const progressBar = document.getElementById('progressBar');
        const quizQuestionText = document.getElementById('quizQuestionText');
        const quizOptionsContainer = document.getElementById('quizOptionsContainer');
        const prevQuestionBtn = document.getElementById('prevQuestionBtn');
        const nextQuestionBtn = document.getElementById('nextQuestionBtn');
        const quizResultPage = document.getElementById('quizResultPage');
        const selectedOptions = document.getElementById('selectedOptions');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const homeBtn = document.getElementById('homeBtn');
        const moodResult = document.getElementById('moodResult');
        const moodAnalysisText = document.getElementById('moodAnalysisText');
        const songRecommendations = document.getElementById('songRecommendations');
        const backToResultsBtn = document.getElementById('backToResultsBtn');
        const newQuizBtn = document.getElementById('newQuizBtn');
        const moodHomeBtn = document.getElementById('moodHomeBtn');

        // Quiz questions data
        const groupedQuestions = [
            [
                { question: "If your life was a movie scene right now, which fits best?", options: [{ text: "✨ Victory Speech on Stage", value: 1 }, { text: "☕ Montage of cozy home moments", value: 2 }, { text: "😴 Falling asleep during a lecture", value: 3 }, { text: "😭 Slow-motion walk in rain", value: 4 }] },
                { question: "Where would you be in a group photo today?", options: [{ text: "😎 Front row, holding a trophy", value: 1 }, { text: "😊 Middle row, smiling naturally", value: 2 }, { text: "😐 Back row, fake smiling", value: 3 }, { text: "🙅‍♀️ Cropped out completely", value: 4 }] },
                { question: "If you were a piece of clothing today, what would you be?", options: [{ text: "🧢 Bright tee and sunglasses", value: 1 }, { text: "🩳 Loose old T-shirt ", value: 2 }, { text: "👖 Jeans too tight", value: 3 }, { text: "🧥 Oversized hoodie with drawstrings pulled", value: 4 }] },
                { question: "What kind of parcel are you right now?", options: [{ text: "🎁 Wrapped with a bow", value: 1 }, { text: "📦 Still in transit", value: 2 }, { text: "📬 Overstuffed ", value: 3 }, { text: "❌ Returned to sender", value: 4 }] },
                { question: "What kind of weather feels like you today?", options: [{ text: "🌤️ Clear skies", value: 1 }, { text: "🌫️ Foggy", value: 2 }, { text: "🌧️ Drizzling", value: 3 }, { text: "🌪️ Tornado ", value: 4 }] }
            ],
            [
                { question: "If your feelings were a vending machine?", options: [{ text: "🥤Fully stocked and giving out joy", value: 1 }, { text: "🥨Only has crackers and warm soda ", value: 2 }, { text: "🪙😬Coin stuck, nothing's coming out", value: 3 }, { text: "🚫Out of Order sign hanging sadly", value: 4 }] },
                { question: "What kind of soup is your emotional state?", options: [{ text: "Chicken noodle", value: 1 }, { text: "Tomato", value: 2 }, { text: "Miso", value: 3 }, { text: " Ice cold water in a soup bowl", value: 4 }] },
                { question: "Pick a classroom seat:", options: [{ text: "🎯 Front row", value: 1 }, { text: "🪑 Middle row", value: 2 }, { text: "💭 Near window", value: 3 }, { text: "🌀 Under the desk ", value: 4 }] },
                { question: "If your brain were a browser tab...", options: [{ text: "✅ One neat tab open", value: 1 }, { text: "🕸️ 5 tabs, 2 with music ", value: 2 }, { text: "⚠️ 12 tabs, 3 playing music", value: 3 }, { text: "💥 Frozen browser", value: 4 }] },
                { question: " What kind of animal are you right now?", options: [{ text: "🐅 Tiger ", value: 1 }, { text: "🐢 Turtle", value: 2 }, { text: "🐑 Sheep", value: 3 }, { text: "🦥 Sloth", value: 4 }] }
            ],
            [
                { question: "If your mind were a room...", options: [{ text: "🛋️ Tidy studio", value: 1 }, { text: "🧺 Messy closet", value: 2 }, { text: "🏚️ Abandoned attic", value: 3 }, { text: "🔥 Room on fire ", value: 4 }] },
                { question: "Choose your current playlist:", options: [{ text: "🎶 Happy indie bops", value: 1 }, { text: "🎧 Lo-fi beats", value: 2 }, { text: "🥀 2010s sad pop", value: 3 }, { text: "💔 Full breakup album", value: 4 }] },
                { question: "If you were a plant today:", options: [{ text: "🌻 Sunflower", value: 1 }, { text: "🌱 Potted herb", value: 2 }, { text: "🌿 Wilted fern", value: 3 }, { text: "🍂 Leaf pile", value: 4 }] },
                { question: "Your phone battery = your energy level:", options: [{ text: "🔋100%", value: 1 }, { text: "🔋55%", value: 2 }, { text: "🔋20%", value: 3 }, { text: "🔋1%", value: 4 }] },
                { question: "If you were a room in a house:", options: [{ text: "🍽️ Kitchen", value: 1 }, { text: "📚 Study", value: 2 }, { text: "🛁 Bathroom", value: 3 }, { text: "🛏️ Bed", value: 4 }] }
            ],
            [
                { question: "Current type of hug you need:", options: [{ text: "🫂 Bear hug", value: 1 }, { text: "🤗 Side hug", value: 2 }, { text: "🙃 Pat on the back", value: 3 }, { text: "🙃 Pat on the back", value: 4 }] },
                { question: "Choose your inner emoji:", options: [{ text: "😎 Chill and unbothered", value: 1 }, { text: "😐 Neutral, just existing", value:2 }, { text: "😵‍💫 Confused and spinning", value: 3 }, { text: "😭 Crying in lowercase", value: 4 }] },
                { question: "Your vibe as a color:", options: [{ text: "🟢 Green ", value: 1 }, { text: "⚪ White", value: 2 }, { text: "🟠 Orange", value: 3 }, { text: "⚫ Black", value: 4 }] },
                { question: "If your day were a beverage", options: [{ text: "✨ Sparkling lemonade made by an angel", value: 1 }, { text: "✨ Sparkling lemonade made by an angel", value: 2 }, { text: "☕ Forgotten coffee microwaved 3 times", value: 3 }, { text: "🧂 Saltwater in a wine glass (you cried in it)", value: 4 }] },
                { question: "Current version of yourself:", options: [{ text: "💅 CEO of Holding It Together", value: 1 }, { text: "😐 Loading... please wait", value: 2 }, { text: "😶‍🌫️ Ghost of last week's decisions", value: 3 }, { text: "🧍‍♀️ A sock on the floor of life", value: 4 }] }
            ],
            [
                { question: "If you were a file, which one would you be?", options: [{ text: "📄 Tidy .pdf ", value: 1 }, { text: "📝 Half-done .doc", value: 2 }, { text: "🗃️ Old .zip file", value: 3 }, { text: "🗃️ Old .zip file", value: 4 }] },
                { question: "If your emotions were a pet today:", options: [{ text: "🐶 Happy puppy", value: 1 }, { text: "🐈 Cat under a bed", value: 2 }, { text: "🐇 Nervous bunny", value: 3 }, { text: "🦨 Hissing skunk", value: 4 }] },
                { question: "If you were a phone notification...", options: [{ text: "✅ Package delivered!", value: 1 }, { text: "🕒Reminder: you have a meeting", value: 2 }, { text: "⚠️ Battery low – 10% remaining", value: 3 }, { text: "🆘 Storage full. App will close now.", value: 4 }] },
                { question: "What's your current mental wallpaper?", options: [{ text: "🌌 A galaxy with loading dots", value: 1 }, { text: "🐸 A frog sipping tea on a lily pad", value: 2 }, { text: "🐱 A cat screaming into the void", value: 3 }, { text: "🚫 404 thoughts not found", value: 4 }] },
                { question: "What's your current late-night thought loop?", options: [{ text: "💡 One more episode = good idea", value: 1 }, { text: "😳 Did I embarrass myself 5 years ago?", value: 2 }, { text: "🧳 Should I start a new life?", value: 3 }, { text: "🕳️ What if I just disappeared?", value: 4 }] }
            ],
            [
                { question: " You're teleported into a movie. What's the vibe?", options: [{ text: "💖 Romcom with chaotic best friend energy", value: 1 }, { text: "🎞️ Indie sad boi film", value: 2 }, { text: "🚩 Thriller with too many red flags", value: 3 }, { text: "🍄 A fantasy world where you're just a mushroom", value: 4 }] },
                { question: "Pick one : ", options: [{ text: "📝 Torn song lyrics", value: 1 }, { text: "🐸 Frog in sunglasses", value: 2 }, { text: "📱 Unsent text messages", value: 3 }, { text: "✨ Random sparkle sticker", value: 4 }] },
                { question: "How would a plushie version of you feel today?", options: [{ text: "Freshly fluffed and emotionally available", value: 1 }, { text: "Missing one eye but still smiling ", value: 2 }, { text: "Stuffing coming out but pretending it's fashion", value: 3 }, { text: "Been under the bed since 2019, covered in secrets", value: 4 }] },
                { question: "What's your energy vibe rn?", options: [{ text: "⚡ I could fight a bear", value: 1 }, { text: "🎈 Floating through life", value: 2 }, { text: "🐌 Moving slower than the wifi on a plane", value: 3 }, { text: "🪦 I am a fossil", value: 4 }] },
                { question: "If your emotions were a snack right now, what would they be?", options: [{ text: "🍫 Chocolate lava cake", value: 1 }, { text: "🍕 Cold leftover pizza", value: 2 }, { text: "🌶️ Spicy chips", value: 3 }, { text: "🥦 Raw broccoli", value: 4 }] }
            ],
            [
                { question: "If you were a sticker on someone's laptop today...", options: [{ text: "🌈 You got this!", value: 1 }, { text: "🌀 Maybe later", value: 2 }, { text: " 🫠 Currently buffering…", value: 3 }, { text: "💣 Don't talk to me", value: 4 }] },
                { question: "If today were a type of WiFi connection...", options: [{ text: "📶 5 bars", value: 1 }, { text: "📶 3 bars", value: 2 }, { text: "📶 1 bar", value: 3 }, { text: " 📴 No service", value: 4 }] },
                { question: "If your motivation were a shoestring…", options: [{ text: "👟 Double-knotted and ready to run", value: 1 }, { text: "👟 Loosely tied but working", value: 2 }, { text: "👟 Untied and dragging", value: 3 }, { text: "👟 Untied and dragging", value: 4 }] },
                { question: "If your mental state was a USB drive…", options: [{ text: "🧠 128GB", value: 1 }, { text: "🧠 64GB", value: 2 }, { text: "🧠 16GB", value: 3 }, { text: "🧠 Drive Not Detected", value: 4 }] },
                { question: "Pick your spirit creature today:", options: [{ text: "🦄 Confident unicorn with glitter goals", value: 1 }, { text: "🐢 Turtle just chilling through chaos", value: 2 }, { text: "🐓 Chicken in traffic", value: 3 }, { text: "🪱 Worm with an identity crisis", value: 4 }] }
            ],
            [
                { question: "Pick your current sleep schedule vibe:", options: [{ text: "⏰Slept 8 hours. Woke up radiant 🌞", value: 1 }, { text: " ⏰ Asleep by 2 AM, up by 10 AM-ish", value: 2 }, { text: "⏰ Power naps are my new religion", value: 3 }, { text: "⏰ Nocturnal raccoon chaos with a side of regret", value: 4 }] },
                { question: "How are you hydrating today?", options: [{ text: "💧 Water bottle is my sidekick", value: 1 }, { text: "💧 I took like 3 sips? That's something", value: 2 }, { text: "💧 Does iced coffee count??", value: 3 }, { text: "💧 Haven't seen water since 2 B.C.", value: 4 }] },
                { question: "How are you walking into life today?", options: [{ text: "🧢 Shinchan with flip-flops and max confidence", value: 1 }, { text: "🍍 SpongeBob laughing alone in a bubble", value: 2 }, { text: "📓 Nobita dragging his school bag like a snail", value: 3 }, { text: "🧀 Tom hit by a frying pan", value: 4 }] },
                { question: "If your mind had a search history right now:", options: [{ text: "ow to thrive like a houseplant in indirect sunlight", value: 1 }, { text: "What day is it?", value: 2 }, { text: "Should I move to Iceland and open a bookstore?", value: 3 }, { text: "How to disappear without raising suspicion", value: 4 }] },
                { question: "If your mood were a city today, which one would you be?", options: [{ text: "🏙️ Bangkok", value: 1 }, { text: "🥐 Paris", value: 2 }, { text: "🏜️ Sahara Desert-core ", value: 3 }, { text: "❄️ Siberia", value: 4 }] },
                { question: "How are you navigating life rn?", options: [{ text: "With a sparkly map and a silly little dream", value: 1 }, { text: "Google Maps but set to pedestrian mode", value: 2 }, { text: "Driving blindfolded with emotional GPS", value: 3 }, { text: "Just following a raccoon with a stick", value: 4 }] }
            ]
        ];

        let questionsSet = [];
        let currentQuestionIndex = 0;
        let selectedAnswers = [];
        let selectedOptionsText = [];
        let currentSelectedOption = null;



        //DONT TOUCH ANYTHING FROM THIS POINT ON
        // Create cherry blossom petals
        function createPetals() {
            const petalsContainer = document.getElementById('petals-container');
            const petalCount = 15;
            
            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                
                // Random size
                const size = Math.random() * 15 + 10;
                petal.style.width = `${size}px`;
                petal.style.height = `${size}px`;
                
                // Random position
                petal.style.left = `${Math.random() * 100}%`;
                
                // Random animation properties
                const duration = Math.random() * 15 + 15;
                const delay = Math.random() * 10;
                const drift = Math.random() * 2 - 1; // -1 to 1
                
                petal.style.setProperty('--drift', drift);
                petal.style.animationDuration = `${duration}s`;
                petal.style.animationDelay = `${delay}s`;
                
                // Random blur
                if (Math.random() > 0.7) {
                    petal.style.filter = 'blur(1px) drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
                }
                
                // Random z-index
                petal.style.zIndex = Math.floor(Math.random() * 5) + 5;
                
                petalsContainer.appendChild(petal);
            }
        }

        // Create floating circles
        function createFloatingCircles() {
            const circleCount = 5;
            
            for (let i = 0; i < circleCount; i++) {
                const circle = document.createElement('div');
                circle.classList.add('floating-circle');
                
                // Random size
                const size = Math.random() * 200 + 100;
                circle.style.width = `${size}px`;
                circle.style.height = `${size}px`;
                
                // Random position
                circle.style.left = `${Math.random() * 100}%`;
                circle.style.top = `${Math.random() * 100}%`;
                
                // Random animation properties
                const duration = Math.random() * 10 + 10;
                const delay = Math.random() * 5;
                
                circle.style.animationDuration = `${duration}s`;
                circle.style.animationDelay = `${delay}s`;
                
                // Random opacity
                circle.style.opacity = Math.random() * 0.1 + 0.05;
                
                floatingCircles.appendChild(circle);
            }
        }

        // Animation sequence
        function startAnimationSequence() {
            createFloatingCircles();
            
            // Hide intro after 3 seconds
            setTimeout(() => {
                introScreen.classList.add('hidden');
            }, 3000);

            // Show speech bubble after cat appears
            setTimeout(() => {
                speechBubble.classList.add('visible');
                animationComplete = true;
            }, 5500);
        }
        //YOU CAN TOUCH FROM THIS POINT ON



        // Start quiz function
        function startQuiz() {
            const randomIndex = Math.floor(Math.random() * groupedQuestions.length);
            questionsSet = groupedQuestions[randomIndex];
            currentQuestionIndex = 0;
            selectedAnswers = [];
            selectedOptionsText = [];
            currentSelectedOption = null;
            
            // Hide main page and show quiz page
            mainPage.style.display = "none";
            aboutPage.style.display = "none";
            quizPage.style.display = "flex";
            quizResultPage.style.display = "none";
            moodResult.style.display = "none";
            document.getElementById('quizQuestionContainer').style.display = "block";
            
            showQuestionPage();
        }

        // Show question page
        function showQuestionPage() {
            // Update progress bar
            const progressPercentage = (currentQuestionIndex / questionsSet.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            
            // Update navigation buttons
            prevQuestionBtn.disabled = currentQuestionIndex === 0;
            nextQuestionBtn.disabled = currentSelectedOption === null;
            
            const q = questionsSet[currentQuestionIndex];
            quizQuestionText.innerText = q.question;
            quizOptionsContainer.innerHTML = "";

            q.options.forEach((opt, index) => {
                const btn = document.createElement("div");
                btn.classList.add("quiz-option-page");
                btn.innerText = opt.text;
                
                // Check if this option was previously selected
                if (currentSelectedOption === index) {
                    btn.style.background = "rgba(212, 106, 106, 0.1)";
                    btn.style.border = "1px solid var(--accent-pink)";
                }
                
                btn.addEventListener("click", () => {
                    // Reset all options
                    document.querySelectorAll('.quiz-option-page').forEach(option => {
                        option.style.background = "rgba(255, 253, 250, 0.9)";
                        option.style.border = "1px solid rgba(212, 106, 106, 0.1)";
                    });
                    
                    // Highlight selected option
                    btn.style.background = "rgba(212, 106, 106, 0.1)";
                    btn.style.border = "1px solid var(--accent-pink)";
                    
                    currentSelectedOption = index;
                    nextQuestionBtn.disabled = false;
                });
                
                quizOptionsContainer.appendChild(btn);
            });
        }

        // Go to next question
        function goToNextQuestion() {
            if (currentSelectedOption === null) return;
            
            const q = questionsSet[currentQuestionIndex];
            const selectedOption = q.options[currentSelectedOption];
            
            // Store the selected answer
            if (selectedAnswers.length <= currentQuestionIndex) {
                selectedAnswers.push(selectedOption.value);
                selectedOptionsText.push({
                    question: q.question,
                    answer: selectedOption.text
                });
            } else {
                selectedAnswers[currentQuestionIndex] = selectedOption.value;
                selectedOptionsText[currentQuestionIndex] = {
                    question: q.question,
                    answer: selectedOption.text
                };
            }
            
            currentQuestionIndex++;
            currentSelectedOption = null;
            
            if (currentQuestionIndex < questionsSet.length) {
                showQuestionPage();
            } else {
                showResultPage();
            }
        }

        // Go to previous question
        function goToPrevQuestion() {
            if (currentQuestionIndex === 0) return;
            
            currentQuestionIndex--;
            currentSelectedOption = null;
            
            // If we have a previous answer for this question, highlight it
            if (selectedAnswers.length > currentQuestionIndex) {
                currentSelectedOption = questionsSet[currentQuestionIndex].options.findIndex(
                    opt => opt.value === selectedAnswers[currentQuestionIndex]
                );
            }
            
            showQuestionPage();
        }

        // Show result page
        function showResultPage() {
            // Hide question container and show result
            document.getElementById('quizQuestionContainer').style.display = "none";
            quizResultPage.style.display = "flex";
            
            // Display selected options
            selectedOptions.innerHTML = "";
            selectedOptionsText.forEach((item, index) => {
                const div = document.createElement("div");
                div.classList.add("selected-option");
                div.innerHTML = `<strong>Q${index + 1}:</strong> ${item.question}<br>
                                <strong>A:</strong> ${item.answer}`;
                selectedOptions.appendChild(div);
            });
        }

        //DEFINITELY NEED TO CHANGE THIS
        // Analyze mood
        function analyzeMood() {
            const avg = selectedAnswers.reduce((a, b) => a + b, 0) / selectedAnswers.length;
            
            let mood = "";
            let moodDescription = "";
            
            if (avg < 1.8) {
                mood = "Joyful";
                moodDescription = "You're radiating positive energy! Your responses show you're feeling confident, happy, and full of life. Keep shining!";
            } 
            else if (avg < 2.5) {
                mood = "Chill / Neutral";
                moodDescription = "You're in a balanced, content state. Not too high, not too low - just comfortably cruising through life right now.";
            } 
            else if (avg < 3.2) {
                mood = "Low Energy";
                moodDescription = "You seem to be feeling a bit drained or tired. Maybe you need some rest, self-care, or a little pick-me-up.";
            } 
            else {
                mood = "Emotional / Overwhelmed";
                moodDescription = "Your responses suggest you're feeling some intense emotions right now. Remember it's okay to feel this way, and consider reaching out to someone you trust if you need support.";
            }

            const moodSongs = {
                "Joyful": [
                    {
                        title: "Walking on Sunshine",
                        artist: "Katrina and the Waves",
                        image: "https://th.bing.com/th/id/OIP.P8NL5kvePtM5Y9JmlqTslgHaHn?w=168&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
                        link: "https://open.spotify.com/search/walking%20on%20sunshine%20katrina"
                    },
                    {
                        title: "Can't Stop the Feeling!",
                        artist: "Justin Timberlake",
                        image: "https://th.bing.com/th/id/OIP.Cea1InGXZI7Nq5n2p7XbNQHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
                        link: "https://open.spotify.com/search/can't%20stop%20the%20feeling"
                    }
                ],
                "Chill / Neutral": [
                    {
                        title: "Sunflower",
                        artist: "Post Malone, Swae Lee",
                        image: "https://tse1.mm.bing.net/th/id/OIP.h4HsD4PQTZRZHgErWQxKLAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                        link: "https://open.spotify.com/search/sunflower%20post%20malone"
                    },
                    {
                        title: "Coffee",
                        artist: "Beabadoobee",
                        image: "https://th.bing.com/th/id/OIP.JGCHg38OQpFZivWUQAtDPwHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
                        link: "https://open.spotify.com/search/coffee%20beabadoobee"
                    }
                ],
                "Low Energy": [
                    {
                        title: "Breathe Me",
                        artist: "Sia",
                        image: "https://img.discogs.com/L1Hmjzn890YwzcYf9FicGNgE5lw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-308906-1193664880.jpeg.jpg",
                        link: "https://open.spotify.com/search/breathe%20me%20sia"
                    },
                    {
                        title: "The Night We Met",
                        artist: "Lord Huron",
                        image: "https://c.saavncdn.com/473/The-Night-We-Met-English-2015-500x500.jpg",
                        link: "https://open.spotify.com/search/the%20night%20we%20met"
                    }
                ],
                "Emotional / Overwhelmed": [
                    {
                        title: "Fix You",
                        artist: "Coldplay",
                        image: "https://th.bing.com/th/id/OIP.WitajwGo01Eo1TPRhvmPmQHaHa?w=185&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
                        link: "https://open.spotify.com/search/fix%20you%20coldplay"
                    },
                    {
                        title: "Creep",
                        artist: "Radiohead",
                        image: "https://th.bing.com/th/id/OIP.bkkOTULb0gQgva81dPYENQHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
                        link: "https://open.spotify.com/search/creep%20radiohead"
                    }
                ]
            };

            const songRecs = moodSongs[mood];

            // Show mood analysis
            quizResultPage.style.display = "none";
            moodResult.style.display = "flex";
            
            moodAnalysisText.innerHTML = `
                <div class="selected-option">
                    <h3>${mood}</h3>
                    <p>${moodDescription}</p>
                    <p>Average score: ${avg.toFixed(2)}</p>
                </div>
            `;
            
            // Show song recommendations
            songRecommendations.innerHTML = "";
            songRecs.forEach(song => {
                const songCard = document.createElement("div");
                songCard.classList.add("song-card");
                songCard.innerHTML = `
                    <img src="${song.image}" alt="${song.title}" class="song-image">
                    <h4 class="song-title">${song.title}</h4>
                    <p class="song-artist">${song.artist}</p>
                    <a href="${song.link}" target="_blank" class="spotify-btn">Listen on Spotify</a>
                `;
                songRecommendations.appendChild(songCard);
            });
        }

        //AGAIN DONT TOUCH FROM HERE
        // Go back home
        function goBackHome() {
            quizPage.style.display = "none";
            aboutPage.style.display = "none";
            moodResult.style.display = "none";
            mainPage.style.display = "flex";
        }

        // Show about page
        function showAboutPage() {
            mainPage.style.display = "none";
            quizPage.style.display = "none";
            aboutPage.style.display = "flex";
        }

        // Back to results from mood analysis
        function backToResults() {
            moodResult.style.display = "none";
            quizResultPage.style.display = "flex";
        }

        // Add cat interactions
        function addCatInteractions() {
            const catMascot = document.querySelector('.cat-mascot');
            
            catMascot.addEventListener('mouseenter', () => {
                if (animationComplete) {
                    catMascot.style.filter = 'drop-shadow(0 0 30px rgba(212, 106, 106, 0.2)) brightness(1.05)';
                    catMascot.style.animation = 'gentleFloat 2s ease-in-out infinite';
                }
            });
            
            catMascot.addEventListener('mouseleave', () => {
                catMascot.style.filter = 'grayscale(20%) brightness(1.05)';
                catMascot.style.animation = 'gentleFloat 4s ease-in-out infinite';
            });
            
            catMascot.addEventListener('click', () => {
                if (animationComplete) {
                    const speechText = speechBubble.querySelector('.speech-text');
                    const originalText = speechText.innerHTML;
                    speechText.innerHTML = 'Ready? 🚀';
                    
                    catMascot.style.animation = 'titleBounce 0.6s ease-in-out';
                    setTimeout(() => {
                        catMascot.style.animation = 'gentleFloat 4s ease-in-out infinite';
                    }, 600);
                    
                    setTimeout(() => {
                        speechText.innerHTML = originalText;
                    }, 2500);
                }
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createPetals();
            startAnimationSequence();
            addCatInteractions();
            
            // Set up start button
            startButton.addEventListener('click', (event) => {
                event.preventDefault();
                startQuiz();
                
                // Add click effect
                startButton.style.transform = 'translateY(-1px) scale(0.95)';
                setTimeout(() => {
                    startButton.style.transform = '';
                }, 150);
            });
            
            // Set up about link
            aboutLink.addEventListener('click', (event) => {
                event.preventDefault();
                showAboutPage();
            });
            
            // Set up about home button
            aboutHomeBtn.addEventListener('click', goBackHome);
            
            // Set up analyze button
            analyzeBtn.addEventListener('click', analyzeMood);
            
            // Set up home button
            homeBtn.addEventListener('click', goBackHome);
            
            // Set up back to results button
            backToResultsBtn.addEventListener('click', backToResults);
            
            // Set up new quiz button
            newQuizBtn.addEventListener('click', startQuiz);
            
            // Set up mood home button
            moodHomeBtn.addEventListener('click', goBackHome);
            
            // Set up quiz navigation buttons
            prevQuestionBtn.addEventListener('click', goToPrevQuestion);
            nextQuestionBtn.addEventListener('click', goToNextQuestion);
        });
