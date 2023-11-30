from bs4 import BeautifulSoup
import openai
import argparse
import string

openai.api_key = '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'

def translate_text(text, target_language):
    original_text = text.strip()
    prompt = f"Translate the following English text to {target_language}: '{original_text}'"

    # Исключаем использование кавычек, если их не было изначально
    if not any(char in original_text for char in ('"', "'")):
        prompt += " without using quotes"

    # Исключаем использование знаков препинания, если их не было изначально
    if not any(char in original_text for char in string.punctuation):
        prompt += " without using punctuation"

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100
    )
    translated_text = response.choices[0].text.strip()
    return translated_text

def translate_html(input_html, target_language='es'):
    soup = BeautifulSoup(input_html, 'html.parser')
    total_tags = len(list(soup.find_all()))

    translated_html = ""
    tags_processed = 0

    for tag in soup.find_all():
        if tag.name in ['style', 'script']:
            # Пропускаем содержимое тегов style и script
            continue

        if tag.string:
            original_text = tag.string.strip()
            translated_text = translate_text(original_text, target_language)
            tag.string.replace_with(translated_text)

        tags_processed += 1
        percentage_completed = (tags_processed / total_tags) * 100
        print(f"Translation progress: {percentage_completed:.2f}%")

    translated_html = str(soup)
    return translated_html

def main():
    parser = argparse.ArgumentParser(description='Translate HTML content.')
    parser.add_argument('--input_file', type=str, default='index.html', help='Path to the input HTML file')
    parser.add_argument('--output_file', type=str, default='translated_index.html', help='Path to the output HTML file')
    parser.add_argument('--target_language', type=str, default='es', help='Target language for translation')

    args = parser.parse_args()

    with open(args.input_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    translated_html = translate_html(html_content, args.target_language)

    with open(args.output_file, 'w', encoding='utf-8') as file:
        file.write(translated_html)

    print(f'Translation completed. Translated HTML saved to {args.output_file}')

if __name__ == "__main__":
    main()
