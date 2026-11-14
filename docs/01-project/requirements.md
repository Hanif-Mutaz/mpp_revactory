# Requirements

## Tujuan
MPP mencatat kehadiran dan menempatkan manpower produksi ke line/process berdasarkan Skill Matrix, Daily Plan aktif, slot, dan urutan skill.

## Business invariants
- INV-001 EmpID adalah NIK dan barcode MUST sama.
- INV-002 Employee INACTIVE MUST ditolak saat check-in.
- INV-003 Satu employee MUST hanya memiliki satu attendance terbuka.
- INV-004 Satu employee MUST hanya memiliki satu assignment aktif per work date + shift.
- INV-005 Auto-placement MUST memakai skill yang dimiliki dan priority terkecil lebih dulu.
- INV-006 Satu normal process slot MUST tidak melebihi required_count.
- INV-007 Jika tidak ada slot, attendance tetap CHECK_IN dan employee masuk WAITING.
- INV-008 Waiting auto-placement MUST FIFO berdasarkan waiting_since.
- INV-009 Shift 20:00-08:00 memakai work date tanggal shift dimulai.
- INV-010 Mutasi business state MUST diotorisasi server-side.

## Role
ADMIN: master, correction, approval, settings, import, backup.
LEADER: plan, scan, waiting, attendance monitoring.
VIEWER: dashboard read-only.
SUPERVISOR: read/oversight; capability dapat diperluas tanpa bypass authorization.
