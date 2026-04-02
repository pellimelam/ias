import requests
import json
import os

OUTPUT = "data/books.json"

def fetch_books():
    url = "https://gutendex.com/books"
    books = []

    while url and len(books) < 2000:  # limit for performance
        res = requests.get(url).json()

        for b in res["results"]:
            books.append({
                "title": b["title"],
                "author": b["authors"][0]["name"] if b["authors"] else "Unknown",
                "subject": b["subjects"][0] if b["subjects"] else "general",
                "download": b["formats"].get("application/epub+zip"),
                "read": b["formats"].get("text/html")
            })

        url = res["next"]

    return books


if __name__ == "__main__":
    books = fetch_books()

    os.makedirs("data", exist_ok=True)

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(books, f, indent=2, ensure_ascii=False)

    print(f"✅ Saved {len(books)} books")
