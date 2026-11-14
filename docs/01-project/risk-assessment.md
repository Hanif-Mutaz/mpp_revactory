# G0 Risk Assessment
**Risk level: HIGH.** Sistem internal production-supporting. Downtime tidak menghentikan produksi karena ada prosedur manual, tetapi kesalahan state dapat mengubah attendance dan manpower placement. Multi-client concurrency dapat merusak shared state sehingga transaksi, authorization, audit, backup, dan recovery wajib.

Critical invariants:
- INV-001 EmpID = barcode dan unik.
- INV-002 Employee inactive tidak boleh check-in.
- INV-003 Maksimal satu open attendance per employee.
- INV-004 Satu employee hanya satu active assignment pada work date + shift.
- INV-005 Automatic placement hanya ke skill employee dan active Daily Plan.
- INV-006 Skill priority diproses berurutan.
- INV-007 Waiting tetap attendance valid dan FIFO untuk auto placement.
- INV-008 Attendance + assignment/waiting + audit harus atomik.
- INV-009 Unauthorized user tidak boleh mutasi master/attendance/setting.
- INV-010 Shared Cell Leader fallback ke shared line aktif jika main line tidak aktif.
