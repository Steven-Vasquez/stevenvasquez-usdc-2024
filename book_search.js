/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // For each book input object,
    scannedTextObj.forEach(book => {
        // For each phrase in the book,
        book.Content.forEach(phrase => {
            // Split phrase.Text into words and remove punctuation from each word
            const words = phrase.Text.split(" ");
            words.forEach((word, index) => {
                words[index] = word.replace(/[.,\/#!$%\^&\*;:{}=\`~()]/g, "");
                // Remove hyphen from end of word if it exists (but not if it's a hyphenated word)
                if (word.endsWith('-')) {
                    words[index] = word.slice(0, -1);
                }
            });

            // Check if searchTerm is a word in the phrase array
            if (words.includes(searchTerm)) {
                console.log("Found a match!");
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": phrase.Page,
                    "Line": phrase.Line
                });
            }
        });
    });
    
    return result; 
}

/** Example input object. */
const inputObject = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Case sensitivity",
        "ISBN": "1234567890123",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "this is a line of text."
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "THIS is another line of text."
            },
            {
                "Page": 2,
                "Line": 1,
                "Text": "thisis a line of text on page 2. thisthisthisthis"
            }
        ]
    },
    {
        "Title": "Hyphenated Words",
        "ISBN": "1234567890124",
        "Content": [
            {
                "Page": 1,
                "Line": 1,
                "Text": "words-with-hyphens are words too. So are words with"
            },
            {
                "Page": 1,
                "Line": 2,
                "Text": "hyphens- in case an author pauses on a word abruptly."
            }
        ]
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

// TEST 1
/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", inputObject);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

// TEST 2
/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", inputObject); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

// TEST 3
/** Check the case where no results are found */
const test3result = findSearchTermInBooks("abc", inputObject);
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", 0);
    console.log("Received:", test3result.Results.length);
}

// TEST 4
/** Check that the search term is case sensitive */
const test4result = findSearchTermInBooks("THIS", inputObject);
const test4Out = {
    "SearchTerm": "THIS",
    "Results": [
        {
            "ISBN": "1234567890123",
            "Page": 1,
            "Line": 2
        }
    ]
}
if (JSON.stringify(test4Out) === JSON.stringify(test4result)) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", test4Out);
    console.log("Received:", test4result);
}

// TEST 5
/** Check that the results do not also include subwords inside of words (ex: search for "in", found "inside") */
const test5result = findSearchTermInBooks("this", inputObject);
const test5Out = {
    "SearchTerm": "this",
    "Results": [
        {
            "ISBN": "1234567890123",
            "Page": 1,
            "Line": 1
        }
    ]
}
if (JSON.stringify(test5Out) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", test5Out);
    console.log("Received:", test5result);
}

// TEST 6
/** Check that the search function can search for hyphenated words */
const test6result = findSearchTermInBooks("words-with-hyphens", inputObject);
const test6Out = {
    "SearchTerm": "words-with-hyphens",
    "Results": [
        {
            "ISBN": "1234567890124",
            "Page": 1,
            "Line": 1
        }
    ]
}
if (JSON.stringify(test6Out) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", test6Out);
    console.log("Received:", test6result);
}

// TEST 7
/** Check that hyphens are removed when they are used after a word instead of a hyphenated word */
const test7result = findSearchTermInBooks("hyphens", inputObject);
const test7Out = {
    "SearchTerm": "hyphens",
    "Results": [
        {
            "ISBN": "1234567890124",
            "Page": 1,
            "Line": 2
        }
    ]
}
if (JSON.stringify(test7Out) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", test7Out);
    console.log("Received:", test7result);
}

// TEST 8
/** Check that special characters are removed correctly (ex: 'momentum.' is recognized as 'momentum') */
const test8result = findSearchTermInBooks("momentum", inputObject);
const test8Out = {
    "SearchTerm": "momentum",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
if (JSON.stringify(test8Out) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", test8Out);
    console.log("Received:", test8result);
}