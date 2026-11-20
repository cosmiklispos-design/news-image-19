import struct
d = open('/tmp/ni-out1/entry.png', 'rb').read()
print('size bytes:', len(d), '<= 1048576:', len(d) <= 1048576)
w, h = struct.unpack('>II', d[16:24])
print('dims:', w, 'x', h, '<= 1024:', w <= 1024 and h <= 1024)
print('PNG magic ok:', d[:8] == b'\x89PNG\r\n\x1a\n')
print('IEND present:', d[-12:] == b'\x00\x00\x00\x00IEND\xaeB`\x82')
