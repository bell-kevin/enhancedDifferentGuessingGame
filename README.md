# Enhanced Different Guessing Game

In the last project, you created a guessing game where the computer chooses a number (using the random number generator) and the user guesses that number. In this assignment, you will enhance that app to add style, custom fonts and icons. You will add some more functionality to the project, to display past guesses. 

In the previous project, the computer generated the target number, then you guessed it, with the computer giving you hints about whether to guess higher or lower. If you guessed the target number, it said the game was over, how many guesses it took, and the target number. In this version, there will be a list of the guesses made, to be displayed on 2 screens, the game screen and the game over screen. The game over screen will display an icon to show success. 

You will create a separate component for a button so it can be used in multiple files. You will also create a separate component for the list of previous guesses, so it can also be used in multiple files.

NOTE: Make a COPY of the previous project. You will almost certainly need to return to the working version as you encounter difficulties with adding enhancements here. 

The results look like this:

![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/pics/1.PNG) ![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/pics/2.PNG) ![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/pics/3.PNG) ![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/pics/4.PNG)

Note: you will use background color on the screens. These examples use the default white background; you must use some color that is not white.

 

## Task 1: List of Past Guesses

In the video project, the past guesses are displayed on the game screen in separate cards, and when the game is over, the list disappears. All of the code for managing and displaying past guesses lives in one file, the GameScreen.js file. In this project, you will display the list of past guesses on both the GameScreen and the GameOverScreen. Since information only flows downward in the component tree, there is no way to share or send that array variable holding the past guesses from the GameScreen.js file to the GameOverScreen file. That means you have to "lift the state" of that variable up to a higher level, so that variable can be passed down to more than one component. Both the GameScreen.js and the GameOverScreen.js files are called from the App.js file, so that is where the state variable for the past guesses needs to be. When lifting state up, the code for handling the state (adding or deleting items, for example) has to be lifted up to a higher-level component, and that variable has to be added to props to be passed down to lower-level components.

Create a new component for handling the past guesses, named something like DisplayGuesses or PastGuesses. Create the state variable for the array of guesses in the App file. In the video game, the array was initialized with the first random number for the computer's guess. In this project, the array will be initialized with zero, because you won't know any value until the user presses "Check My Guess". The first element in the array, in position 0, will be that initial 0. It will be ignored in the display of the array. There needs to be a function to add the new guess to this state variable. 

In this project, with a number range of 1 to 100, you should be able to guess the number in 7 guesses max, if you use good binary search logic. The list should never be very long, so use a ScrollView to display the list of guesses. The guess was used as the key for the list items in the video tutorial, but it is possible to guess the same number twice, which would crash the program. Instead, use the number you are certain will never be duplicated -- the number of the round. Since it is based on the index of the item in the array, it will always be unique. If the guess is 0 (zero), which is the default or initialized value, don't display it -- only display actual guesses. The style applied to the list of guesses (see above) is simpler than the one in the video tutorial.

Now that there is a component to call to use with the state variable in the App.js file, what changes do you need to make to handle the state variable? It has to be updated when the user enters a new guess. Since the state variable is in the App.js file, the function for adding the new guess to the array of guesses must also be in the App.js file. That means the name of the function has to be passed down to the component for the GameScreen, so it can call that function when the user presses the "Check My Guess" button.

Suggestion 1: Start by adding the new component and calling it from the GameScreen only. This narrows the focus of the work, and may make it easier to debug. Once it works on one screen, add it to the other screen.

Suggestion 2: Add a line of text on the game screen that displays the current target value. That way you can reduce the number of guesses you have to make to get to the Game Over screen. Note that it is likely you will guess that target on the first guess and it will not trigger that it is game over. So guess something that is not the target on the first guess, then use the target value on the second guess. It is not optimal, that the game doesn't recognize that your first guess can be the target; in reality, that will happen very seldom, so it is not necessary to struggle to fix this. If you are trying to see the Game Over screen to test or debug it, guess twice -- you should have more than one guess anyway, to see if the display of past guesses is working correctly.

Suggestion 3: Double check the number of guesses on the GameOver screen. The list of guesses should be numbered correctly starting at 1. The line "Number of guesses" above the New Game button should have the correct value for the total number of guesses -- it should match the round number in the list. If not, adjust the display of that total number of guesses.

## Task 2: Add custom fonts

In the video tutorial, you added custom fonts -- do the same in this project. You may use the same fonts from your previous project about custom fonts, or the fonts in the video tutorial, or some other fonts that you want to try. The fonts need to be readable, not too large or small.

## Task 3: Style the Button

Create a new component for a button that will display "Check My Guess" or "New Game" (see above). It cannot be the default blue background color -- you may select the color. It needs rounded corners (borderRadius). You need to use this new component in both GameScreen and GameOverScreen, passing the appropriate text to the component.

## Task 4: Style the Hint

Use style for the text of the hint so that it mimics the buttons for "Check My Guess" and "New Game". It must have a different background color than the button. Give it rounded corners, to mimic the button. Use a bold custom font. Be sure to type the specific word for the hint in all uppercase -- HIGHER and LOWER, rather than higher and lower.

## Task 5: Add an icon on the GameOver screen

In the video tutorial, you added icons for the hints and an image for the GameOver screen. In this project, use an icon instead of an image when the game is over. The example above uses the "trophy" image in the Ionicons library. That library has another one, "ribbon-sharp", as a suggestion. You can look through other libraries that are part of @expo/vector-icons and select a different icon.

Take 4 screenshots, as shown above.

![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/screenshots/Screenshot%20from%202023-03-04%2009-28-16.png)

![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/screenshots/Screenshot%20from%202023-03-04%2009-28-34.png)

![p](https://github.com/bell-kevin/enhancedDifferentGuessingGame/blob/main/screenshots/Capture.PNG)

Submission: Zip together the root folder and the 4 screenshots, and submit the single zipped folder.

Create one app. for both Android and iOS (Apple) using one computer alorithm for both apps. You'll need Visual Studio Code and Android Studio to get started:

https://code.visualstudio.com/download

https://developer.android.com/studio

If you want to see how your app. will look on iOS (Apple) devices, you'll need Xcode from the Apple app. store:

https://developer.apple.com/xcode/

To run the Xcode app, you'll need a fairly new Apple computer.

https://reactnative.dev/docs/environment-setup

https://reactnative.dev/docs/components-and-apis

Check out App.js here in the code files for the computer algorithm code.

## Reading: Storing Projects

When you complete a React Native project, you should keep it on your storage device for a little while. There are multiple instances where one project will be the basis of another project. The Udemy course keeps building on the projects, so you definitely need to keep those around until you are done with that project in the course.

BUT -- React Native projects are huge. There is a folder, node_modules, that takes up most of the space. If you keep every project you create in this course, you would need at least 20GB of space, probably more. How can you manage this terrible drain on your storage?

That node_modules folder is automatically added when you create a new project. Once you are done with the project, you can delete that folder, node_modules, and the size of your project will shrink dramatically.

This does not destroy the project. If you find you need to run an old project again, which no longer has its node_modules folder, open it in Visual Studio Code, open a terminal, and type "npm install". This will load the node_modules folder again, and the project is whole and ready to run.

Note that when you delete that folder, it takes a noticeable amount of time, far more than it takes to reload it.

A good practice for course maintenance is to keep the project in its full state until you are sure you won't be using it in the next few days, then delete the node_modules folder.

== We're Using GitHub Under Protest ==

This project is currently hosted on GitHub.  This is not ideal; GitHub is a
proprietary, trade-secret system that is not Free and Open Souce Software
(FOSS).  We are deeply concerned about using a proprietary system like GitHub
to develop our FOSS project. I have a [website](https://bellKevin.me) where the
project contributors are actively discussing how we can move away from GitHub
in the long term.  We urge you to read about the [Give up GitHub](https://GiveUpGitHub.org) campaign 
from [the Software Freedom Conservancy](https://sfconservancy.org) to understand some of the reasons why GitHub is not 
a good place to host FOSS projects.

If you are a contributor who personally has already quit using GitHub, please
email me at **bellKevin@pm.me** for how to send us contributions without
using GitHub directly.

Any use of this project's code by GitHub Copilot, past or present, is done
without our permission.  We do not consent to GitHub's use of this project's
code in Copilot.

![Logo of the GiveUpGitHub campaign](https://sfconservancy.org/img/GiveUpGitHub.png)
