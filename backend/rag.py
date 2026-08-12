from sentence_transformers import SentenceTransformer
import chromadb


# Load the embedding model
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


# Create a persistent ChromaDB database
client = chromadb.PersistentClient(path="./chroma_db")


# Create or access our document collection
collection = client.get_or_create_collection(
    name="research_documents"
)


def chunk_text(text, chunk_size=500, overlap=50):
    chunks = []

    start = 0

    while start < len(text):
        end = start + chunk_size

        chunk = text[start:end]

        if chunk.strip():
            chunks.append(chunk)

        start += chunk_size - overlap

    return chunks


def add_document(text, filename):
    chunks = chunk_text(text)

    embeddings = embedding_model.encode(chunks).tolist()

    ids = [
        f"{filename}_{i}"
        for i in range(len(chunks))
    ]

    collection.add(
        documents=chunks,
        embeddings=embeddings,
        ids=ids
    )

    return len(chunks)


def search_documents(query, n_results=5):
    query_embedding = embedding_model.encode([query]).tolist()

    results = collection.query(
        query_embeddings=query_embedding,
        n_results=n_results
    )

    return results
