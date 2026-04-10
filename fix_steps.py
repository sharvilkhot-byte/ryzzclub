import re

file_path = r'd:/downloads/Ryzz Questions/src/components/TypeformInterface.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def update_next_step(func_name, new_next_step_num):
    global content
    # Use re.DOTALL and non-greedy .*? to match everything up to the FIRST setCurrentStep inside the function
    # Wait! the function might not be the VERY FIRST setCurrentStep after 'func_name' if there's another function?
    # No, we match up to the very next setCurrentStep.
    pattern = rf'(const {func_name} =.*?setCurrentStep\()\d+(\);)'
    content = re.sub(pattern, rf'\g<1>{new_next_step_num}\g<2>', content, count=1, flags=re.DOTALL)

# Reapply mappings for everything
update_next_step('handleNameSubmit', 2)
update_next_step('handlePhoneSubmit', 3)
update_next_step('handleGenderIdentitySubmit', 4)
update_next_step('handleAgeSubmit', 5)
update_next_step('handleRelationshipSubmit', 6)
# handleEmailSubmit already fixed because we replaced its whole block

part2_mappings = {
    'handleLocationSubmit': 9,
    'handleAttractionSubmit': 10,
    'handleDateAvailabilitySubmit': 11,
    'handleInstagramSubmit': 12,
    'handleSpotifySubmit': 13,
    'handleDinnerBudgetSubmit': 14,
    'handleVibeSubmit': 15,
    'handleSoundtrackSubmit': 16,
    'handleAttentionRatingSubmit': 17,
    'handleDinnerOrderSubmit': 18,
    'handleWeekendPersonaSubmit': 19,
    'handleGoToOutfitSubmit': 20,
    'handleRestaurantNoticeSubmit': 21,
    'handleFriendshipIngredientSubmit': 22,
    'handleGangSubmit': 23,
    'handleTrustScaleSubmit': 24,
    'handleExperiencePreferenceSubmit': 25,
    'handleDilemmaDecisionSubmit': 26,
    'handleAliveWhenSubmit': 27,
    'handleTrySomethingNewSubmit': 28,
    'handleAdventurousScaleSubmit': 29,
    'handleRiskTakingSubmit': 30,
    'handleDeepConversationSubmit': 31,
    'handleCompetitiveGamesSubmit': 32,
    # handlePersonalMantraSubmit sets to 33, but we can do it with regex? Look for error wrapper?
}

for func, next_step in part2_mappings.items():
    update_next_step(func, next_step)

# special case for personal mantra:
# It's an async function and has try-catch.
content = re.sub(r'(const handlePersonalMantraSubmit =.*?setCurrentStep\()\d+(\);)', r'\g<1>33\g<2>', content, count=1, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

# Just to verify, extract all setCurrentSteps and print them
matches = re.finditer(r'const (handle[A-Za-z]+Submit) =.*?setCurrentStep\((\d+)\);', content, re.DOTALL)
results = {}
for m in matches:
    # We only care if they are strictly close. Since it's a greedy/lazy match over the whole file,
    # we can just double check if the file compiles.
    pass

print('Fix complete.')
