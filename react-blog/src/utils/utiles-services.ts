const utilServices = {
    changeRole(role: Number) {
        switch (role) {
            case 0:
                return "    ";
            case 1:
                return "VIP";
            case 2:
                return "普通用户"
            default:
                break;
        }
    }
}

export default utilServices;