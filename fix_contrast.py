import re

with open('styles/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

def replace_block(content, theme_name, new_block):
    # Find the block starting with the theme name up to the closing brace
    pattern = r'/\*\s*' + re.escape(theme_name) + r'\s*\*/\s*\[data-global-theme=".*?"\]\s*\{(.*?)\}'
    # This is a bit tricky with nested stuff, let's just use exact string replacement for the colors

# We will just do targeted string replacements for the muted colors inside each theme block.

replacements = [
    (
        '''/* 5. THE HERITAGE */
[data-global-theme="heritage"] {
  --color-primary-dark: #1C281F;
  --color-secondary-dark: #151E17;
  --color-brand-gold: #C5B358;
  --color-pure-white: #F5F5DC;
  --color-brand-silver: #A9B0A5;
  --color-muted-light: #2A3B2E;
  --color-muted-dark: #111A13;
}
[data-global-theme="heritage"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="heritage"] {
  --color-primary-dark: #C5B358;
  --color-secondary-dark: #B5A642;
  --color-brand-gold: #1C281F;
  --color-pure-white: #111A13;
  --color-brand-silver: #4A5B4D;
  --color-muted-light: #A9B0A5;
  --color-muted-dark: #1C281F;
}''',
        '''/* 5. THE HERITAGE */
[data-global-theme="heritage"] {
  --color-primary-dark: #1C281F;
  --color-secondary-dark: #151E17;
  --color-brand-gold: #C5B358;
  --color-pure-white: #F5F5DC;
  --color-brand-silver: #A9B0A5;
  --color-muted-light: #A9B0A5;
  --color-muted-dark: #2A3B2E;
}
[data-global-theme="heritage"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="heritage"] {
  --color-primary-dark: #C5B358;
  --color-secondary-dark: #B5A642;
  --color-brand-gold: #1C281F;
  --color-pure-white: #111A13;
  --color-brand-silver: #4A5B4D;
  --color-muted-light: #4A5B4D;
  --color-muted-dark: #E6D787;
}'''
    ),
    (
        '''/* 6. THE GALLERY */
[data-global-theme="gallery"] {
  --color-primary-dark: #1A1A1A;
  --color-secondary-dark: #111111;
  --color-brand-gold: #F5F5F0;
  --color-pure-white: #FFFFFF;
  --color-brand-silver: #999999;
  --color-muted-light: #2A2A2A;
  --color-muted-dark: #0D0D0D;
}
[data-global-theme="gallery"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="gallery"] {
  --color-primary-dark: #F5F5F0;
  --color-secondary-dark: #E8E8E3;
  --color-brand-gold: #1A1A1A;
  --color-pure-white: #111111;
  --color-brand-silver: #666666;
  --color-muted-light: #D5D5D0;
  --color-muted-dark: #F5F5F0;
}''',
        '''/* 6. THE GALLERY */
[data-global-theme="gallery"] {
  --color-primary-dark: #1A1A1A;
  --color-secondary-dark: #111111;
  --color-brand-gold: #F5F5F0;
  --color-pure-white: #FFFFFF;
  --color-brand-silver: #999999;
  --color-muted-light: #A0A0A0;
  --color-muted-dark: #2A2A2A;
}
[data-global-theme="gallery"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="gallery"] {
  --color-primary-dark: #F5F5F0;
  --color-secondary-dark: #E8E8E3;
  --color-brand-gold: #1A1A1A;
  --color-pure-white: #111111;
  --color-brand-silver: #666666;
  --color-muted-light: #555555;
  --color-muted-dark: #E8E8E3;
}'''
    ),
    (
        '''/* 7. EARTHY BRUTALISM */
[data-global-theme="brutalism"] {
  --color-primary-dark: #141414;
  --color-secondary-dark: #0A0A0A;
  --color-brand-gold: #C4795A;
  --color-pure-white: #F0E6D2;
  --color-brand-silver: #8A7A72;
  --color-muted-light: #2A1F1A;
  --color-muted-dark: #050505;
}
[data-global-theme="brutalism"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="brutalism"] {
  --color-primary-dark: #C4795A;
  --color-secondary-dark: #A96245;
  --color-brand-gold: #141414;
  --color-pure-white: #0A0A0A;
  --color-brand-silver: #5E3D31;
  --color-muted-light: #DF9678;
  --color-muted-dark: #141414;
}''',
        '''/* 7. EARTHY BRUTALISM */
[data-global-theme="brutalism"] {
  --color-primary-dark: #141414;
  --color-secondary-dark: #0A0A0A;
  --color-brand-gold: #C4795A;
  --color-pure-white: #F0E6D2;
  --color-brand-silver: #8A7A72;
  --color-muted-light: #A99F94;
  --color-muted-dark: #2A1F1A;
}
[data-global-theme="brutalism"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="brutalism"] {
  --color-primary-dark: #C4795A;
  --color-secondary-dark: #A96245;
  --color-brand-gold: #141414;
  --color-pure-white: #0A0A0A;
  --color-brand-silver: #5E3D31;
  --color-muted-light: #3D261E;
  --color-muted-dark: #DF9678;
}'''
    ),
    (
        '''/* 8. MIDNIGHT NAVY */
[data-global-theme="midnight"] {
  --color-primary-dark: #0A1128;
  --color-secondary-dark: #060B1A;
  --color-brand-gold: #FAF3E0;
  --color-pure-white: #FFFFFF;
  --color-brand-silver: #7A89AA;
  --color-muted-light: #15224A;
  --color-muted-dark: #030612;
}
[data-global-theme="midnight"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="midnight"] {
  --color-primary-dark: #FAF3E0;
  --color-secondary-dark: #E8DFCB;
  --color-brand-gold: #0A1128;
  --color-pure-white: #060B1A;
  --color-brand-silver: #6B7C9E;
  --color-muted-light: #D1CAB8;
  --color-muted-dark: #FAF3E0;
}''',
        '''/* 8. MIDNIGHT NAVY */
[data-global-theme="midnight"] {
  --color-primary-dark: #0A1128;
  --color-secondary-dark: #060B1A;
  --color-brand-gold: #FAF3E0;
  --color-pure-white: #FFFFFF;
  --color-brand-silver: #7A89AA;
  --color-muted-light: #94A3C6;
  --color-muted-dark: #15224A;
}
[data-global-theme="midnight"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="midnight"] {
  --color-primary-dark: #FAF3E0;
  --color-secondary-dark: #E8DFCB;
  --color-brand-gold: #0A1128;
  --color-pure-white: #060B1A;
  --color-brand-silver: #6B7C9E;
  --color-muted-light: #4A5B82;
  --color-muted-dark: #E8DFCB;
}'''
    ),
    (
        '''/* 9. THE ANALOG */
[data-global-theme="analog"] {
  --color-primary-dark: #2B1E16;
  --color-secondary-dark: #1C120D;
  --color-brand-gold: #E8DCC4;
  --color-pure-white: #FDFBF7;
  --color-brand-silver: #9C897B;
  --color-muted-light: #3D2D23;
  --color-muted-dark: #140D09;
}
[data-global-theme="analog"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="analog"] {
  --color-primary-dark: #E8DCC4;
  --color-secondary-dark: #D4C6AB;
  --color-brand-gold: #2B1E16;
  --color-pure-white: #1C120D;
  --color-brand-silver: #826F60;
  --color-muted-light: #C4B69D;
  --color-muted-dark: #E8DCC4;
}''',
        '''/* 9. THE ANALOG */
[data-global-theme="analog"] {
  --color-primary-dark: #2B1E16;
  --color-secondary-dark: #1C120D;
  --color-brand-gold: #E8DCC4;
  --color-pure-white: #FDFBF7;
  --color-brand-silver: #9C897B;
  --color-muted-light: #B8A89A;
  --color-muted-dark: #3D2D23;
}
[data-global-theme="analog"] [data-theme="golden"],
[data-theme="golden"][data-global-theme="analog"] {
  --color-primary-dark: #E8DCC4;
  --color-secondary-dark: #D4C6AB;
  --color-brand-gold: #2B1E16;
  --color-pure-white: #1C120D;
  --color-brand-silver: #826F60;
  --color-muted-light: #5A4A3E;
  --color-muted-dark: #D8CBB3;
}'''
    )
]

for old_str, new_str in replacements:
    if old_str in content:
        content = content.replace(old_str, new_str)
    else:
        print(f"COULD NOT FIND BLOCK: {old_str[:50]}...")

with open('styles/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done!")
