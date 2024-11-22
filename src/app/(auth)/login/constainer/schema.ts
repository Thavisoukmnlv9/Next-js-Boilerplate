import { z } from "zod";

export const formSchema = z.object({
    tel: z
        .string()
        .min(1, { message: "ກະລຸນາໃສ່ເບີໂທຂອງທ່ານ" })
        .regex(/^\d{8,}$/, { message: "ເບີໂທທີ່ປ້ອນບໍ່ຖືກຕ້ອງ" }),
    password: z
        .string()
        .min(1, { message: "ກະລຸນາໃສ່ລະຫັດຜ່ານຂອງທ່ານ" })
        .min(8, { message: "ລະຫັດຜ່ານຕ້ອງຍາວຢ່າງນ້ອຍ 8 ຕົວອັກສອນ" }),
});
