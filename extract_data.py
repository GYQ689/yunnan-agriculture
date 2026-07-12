import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Read the hyper file and extract readable strings
base_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(base_dir, 'twbx_extracted', 'Data', 'Desktop')

for fname in os.listdir(data_dir):
    if fname.endswith('.hyper'):
        fpath = os.path.join(data_dir, fname)
        print(f"\n=== {fname} ===")
        with open(fpath, 'rb') as f:
            data = f.read()
        # Extract UTF-8 strings
        text = data.decode('utf-8', errors='ignore')
        # Find sequences of printable characters
        strings = re.findall(r'[\u4e00-\u9fff\w\d\.\-]+', text)
        # Print unique strings longer than 2 chars
        seen = set()
        for s in strings:
            if len(s) > 1 and s not in seen:
                seen.add(s)
                try:
                    print(s)
                except:
                    pass
