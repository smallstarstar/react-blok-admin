const utilServices = {
    changeRole(role: Number) {
        switch (role) {
            case 0:
                return "普通用户";
            case 1:
                return "VIP";
            case 2:
                return "管理员"
            default:
                break;
        }
    }
}

export default utilServices;