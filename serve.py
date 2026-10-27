"""A dependency-free development server. Run: python3 serve.py"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import partial

if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    try:
        server = ThreadingHTTPServer(('127.0.0.1', 8000), handler)
    except OSError as error:
        raise SystemExit(f'Could not start port 8000: {error}. Stop any existing preview server and try again.')
    print('Junto is ready: http://localhost:8000\nPress Ctrl+C to stop.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nPreview server stopped.')
    finally:
        server.server_close()
