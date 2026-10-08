// The promenade, 6:30 PM.
// Lines started from the prototype's nodes() and were rewritten in plain English at
// Ali's request (2026-10-05). Lines marked DRAFT are new for this build and still
// need Ali's sign-off.
// "Name: text" lines are spoken by Name; the game reads the prefix.
// A tag after a line (# smile) sets the speaker's expression in their portrait.

EXTERNAL look(target)
EXTERNAL show(what)
EXTERNAL cue(name)
EXTERNAL moment(id)
EXTERNAL phone()
EXTERNAL ending()

VAR talked_ali = false
VAR talked_vendor = false
VAR chai_bought = false
VAR chai_debt_paid = false
VAR ali_knows_debt = false
VAR cat_follows = false
VAR met_ali2 = false
VAR took_portrait = false
VAR checked_scam = false
VAR met_ali3 = false
VAR met_ali4 = false
VAR met_ali5 = false
VAR met_ali6 = false
// Set by the game before each conversation.
VAR pages_found = 0
VAR gave_pages = false

-> DONE

=== ali ===
~ look("ali")
{ talked_ali: -> again }
~ talked_ali = true
Ali: Oh, hi! You stopped. Most people just walk past. # surprised
// DRAFT: sets up the scattered pages.
Ali: The wind out here keeps trying to steal my notes. If you see any of my pages on your walk, could you pick them up? # neutral
-> openers

= again
// Never met him? Then this is the first hello.
{ not talked_ali: -> ali }
~ look("ali")
{
- chai_debt_paid and not ali_knows_debt:
    ~ ali_knows_debt = true
    // DRAFT
    Ali: Wait. He says I don't owe him anything now. Did you pay for my chai? Thank you. I'm a bit embarrassed. # surprised
- else:
    Ali: Anything else? Also, the chai wala keeps looking at you. # smug
}
-> openers

= openers
+ [What are you working on?] -> work
+ [Why are you coding by the sea?] -> beach
+ [Just show me the cool stuff] -> cool

=== work ===
~ moment("ali")
Ali: An AI that can tell when someone is being sarcastic. People are hard to read, it turns out. # smile
+ [Can I try it?] -> screen("scan")
+ [What else?] -> work2
+ [Ask something else] -> ali.again

=== work2 ===
~ moment("ali")
Ali: A tool that spots scam links before your uncle clicks them. It started at a hackathon, and I kept going. # smug
+ [Show me] -> screen("nicetry")
+ [Ask something else] -> ali.again

=== beach ===
~ moment("ali")
Ali: It's my final year. The hostel Wi-Fi is terrible, and the sea is a calmer place to work. # neutral
+ [Fair. So who are you?] -> who
+ [Ask something else] -> ali.again

=== who ===
~ moment("ali")
Ali: I'm Ali. Final year of computer engineering, with a minor in data science. I build apps and the AI inside them. Then I write a paper about how they work. # smile
+ [Open your file] -> screen("about")
+ [Ask something else] -> ali.again

=== cool ===
~ moment("ali")
Ali: Straight to it. Okay, here's my phone. All my work is in there. Please don't read my drafts. # smug
+ [Take the phone]
    ~ phone()
    -> DONE
+ [Ask something else] -> ali.again

// Ali turns the laptop toward you. The card beside it does the talking.
=== screen(what) ===
~ moment("ali")
~ look("laptop")
~ show(what)
+ [Ask something else]
    ~ show("")
    -> ali.again

=== vendor ===
~ look("vendor")
~ talked_vendor = true
~ moment("chai")
{ chai_debt_paid: -> after_tab }
Chai wala: Ali? He comes every evening. Opens his laptop, orders one small chai, never finishes it. He says he's 'training a model'. I thought he meant a fashion model. # grin
-> options

= options
+ {not chai_bought} [One chai, please] -> pour
// DRAFT
+ {chai_bought and not chai_debt_paid} [I'll pay for Ali's three chais too] -> pay
+ [Talk to Ali] -> ali.again

= pour
~ chai_bought = true
~ cue("pour")
Chai wala: Fifteen rupees. Ali still owes me for three chais. Tell that to his future boss. # grin
-> options

= pay
~ chai_debt_paid = true
~ cue("cash")
// DRAFT
Chai wala: Sixty rupees for everything? Okay. I won't tell him. He can find out when he tries to pay. # surprised
-> options

= after_tab
// DRAFT
Chai wala: You again! For the first time this year, Ali owes me nothing. It feels strange. # neutral
-> options

=== cat ===
~ look("cat")
Cat: Mrrp. # curious
+ [Pet the cat] -> pet
+ [Talk to Ali] -> ali.again

= pet
~ cue("pet")
// DRAFT: from here on the cat follows you along the promenade.
~ cat_follows = true
Cat: The cat does not care about portfolios. It purrs anyway. Now it wants to follow you. # happy
+ [Talk to Ali] -> ali.again

// ------------------------------------------------------------ Scene 2, 8:05 PM
// "Who's there?" The streetlights are on; you get a better look at him.

=== ali2 ===
~ look("ali2")
{ met_ali2: -> again }
~ met_ali2 = true
{
- talked_ali:
    // DRAFT
    Ali: Oh, it's you again! You kept walking. # surprised
- else:
    // DRAFT
    Ali: Hi. Are you looking for someone? # surprised
}
Ali: I'm in my final year of computer engineering, with a minor in data science. I always have too many tabs open. # smile
Ali: I like working on both parts of an app: the screens people use, and the AI working behind them. # neutral
Ali: Then I explain it with a paper, slides and a short video. To me, a project isn't done until people understand it. # smile
// DRAFT: sets up the NiceTry demo.
Ali: Hold on. I just got a text. # neutral
Ali: "Your power will be cut tonight. Pay now." With a link, of course. # smug
-> options

= again
~ look("ali2")
// DRAFT
Ali: Still here? All the streetlights are on now. # smug
-> options

= options
// DRAFT
+ {not checked_scam} [Can I check that link?] -> scam
+ [Can I see your profile?] -> file
// DRAFT: the photo turns up in the camera roll at 9:40 PM
+ {not took_portrait} [Can I take your picture?] -> picture

= file
~ show("about")
+ [Close the profile]
    ~ show("")
    -> again

= scam
~ checked_scam = true
~ show("scam")
// DRAFT
+ [Give the phone back]
    ~ show("")
    -> again

= picture
~ took_portrait = true
~ cue("snap")
// DRAFT
Ali: …Fine. One. Don't post it. # smug
-> options

// ------------------------------------------------------------ Scene 3, 9:40 PM
// "Rain on the camera roll." Under the bus-stop awning, out of the monsoon.

=== ali3 ===
~ look("ali3")
{ met_ali3: -> again }
~ met_ali3 = true
The monsoon rain starts. Everyone runs under the bus stop roof. Ali is looking at old photos on his phone.
{ took_portrait:
    // DRAFT
    Ali: You're dripping on my phone! Oh, is that the photo you took earlier? Fine, I'll keep it. # smug
- else:
    // DRAFT
    Ali: Come in, you're soaked! Here, I was just looking at these. # smile
}
-> options

= again
~ look("ali3")
// DRAFT
Ali: It's still raining. Want to see the photos again? # neutral
-> options

= options
+ [Look at the photos] -> roll

= roll
~ show("roll")
+ [Hand the phone back]
    ~ show("")
    -> again

// ------------------------------------------------------------ Scene 4, 11:50 PM
// "The notebook." The rain has stopped; a table outside the Irani café.

=== ali4 ===
~ look("ali4")
{ met_ali4: -> again }
~ met_ali4 = true
The rain has stopped. Ali opens a notebook. It's full of maths and little drawings.
{ chai_debt_paid:
    // DRAFT
    Ali: The chai wala sent me a chai. He said it was "already paid". I know that was you. # smug
}
{ cat_follows:
    // DRAFT
    Ali: Is that the cat from the promenade? It never follows anyone! # surprised
}
// DRAFT
// DRAFT
{ pages_found > 0:
    Ali: Wait. Are those… my pages? # surprised
}
Ali: This is the work I care about most. Want to see? # smile
-> options

= again
~ look("ali4")
// DRAFT
Ali: The notebook is still open. # neutral
-> options

= options
// DRAFT
+ {not gave_pages and pages_found > 0} [Give Ali his pages] -> give
+ [Read the notebook] -> book
+ [Show me Veherex] -> ev

= ev
Ali: Veherex was my first project. It shows what a trip costs in an EV compared to petrol. Try it. # smile
~ show("ev")
+ [Close it]
    ~ show("")
    -> again

= give
~ gave_pages = true
// DRAFT: Ali's thanks depends on how many pages you found (15 in all).
{
- pages_found >= 15:
    Ali: All of them? Every single page? You walked the whole promenade for my notebook. # surprised
- pages_found >= 8:
    Ali: That's most of my notebook! You actually went looking. Thank you. # smile
- pages_found >= 3:
    Ali: You found {pages_found} of my pages! I thought they were in the sea by now. # surprised
- else:
    Ali: You found one! That's one more than I had. Thank you. # smile
}
Ali: Here, sit. Let me put them back in. # smile
-> book

= book
~ show("notebook")
+ [Close the notebook]
    ~ show("")
    -> again

// ------------------------------------------------------------ Scene 5, 2:10 AM
// "Constellations." Lying back on the sea wall.

=== ali5 ===
~ look("ali5")
{ met_ali5: -> again }
~ met_ali5 = true
The city is finally quiet, and you can see the stars. You both lie back on the wall and give them names.
// DRAFT
Ali: Lie down, the wall is still warm. See that bright star? I'm calling it React. Don't laugh. # smile
-> options

= again
~ look("ali5")
// DRAFT
Ali: Still looking at the stars? # neutral
-> options

= options
+ [Look up] -> sky

= sky
~ look("sky")
~ show("stars")
+ [Sit up]
    ~ show("")
    -> again

// ------------------------------------------------------------ Scene 6, 5:48 AM
// "First light." Bag on his shoulder, watching the sun come up by the sea link.

=== ali6 ===
~ look("ali6")
{ met_ali6: -> again }
~ met_ali6 = true
{
- talked_ali:
    // DRAFT
    Ali: You stayed the whole night! Nobody does that. # surprised
- else:
    // DRAFT
    Ali: Good morning. Have you been walking all night? # smile
}
{ cat_follows:
    // DRAFT
    Ali: And the cat is still following you. It's your cat now. Those are the rules. # smug
}
// DRAFT: a thank-you that depends on the pages you found.
{
- pages_found >= 15:
    Ali: And you found every page of my notebook. Keep it. You know it better than I do now. # smile
- pages_found >= 8:
    Ali: And thanks for finding my pages. Most of my year was on them. # smile
}
Ali: Thanks for staying the whole night. I don't know what comes next for me yet. Maybe we can build it together. # smile
-> options

= again
~ look("ali6")
// DRAFT
Ali: The sun is up. I should sleep. I won't. # smug
-> options

= options
+ [Watch the sun come up] -> watch

= watch
~ ending()
-> DONE
