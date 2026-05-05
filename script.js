const modules = ["Dashboard", "Kullanıcılar", "Roller", "Raporlar", "Ayarlar", "Audit Log"];
const actions = ["view", "create", "edit", "delete", "approve", "export"];

const defaultPermissionState = {
  "Seviye 1 - Görüntüleme": {
    Dashboard: [1, 0, 0, 0, 0, 0],
    Kullanıcılar: [0, 0, 0, 0, 0, 0],
    Roller: [0, 0, 0, 0, 0, 0],
    Raporlar: [1, 0, 0, 0, 0, 0],
    Ayarlar: [0, 0, 0, 0, 0, 0],
    "Audit Log": [0, 0, 0, 0, 0, 0],
  },
  "Seviye 2 - Operasyon": {
    Dashboard: [1, 0, 0, 0, 0, 1],
    Kullanıcılar: [1, 1, 1, 0, 0, 0],
    Roller: [1, 0, 0, 0, 0, 0],
    Raporlar: [1, 0, 0, 0, 0, 1],
    Ayarlar: [0, 0, 0, 0, 0, 0],
    "Audit Log": [1, 0, 0, 0, 0, 0],
  },
  "Seviye 3 - Onay Yetkisi": {
    Dashboard: [1, 0, 1, 0, 1, 1],
    Kullanıcılar: [1, 1, 1, 0, 1, 1],
    Roller: [1, 0, 1, 0, 1, 0],
    Raporlar: [1, 1, 1, 0, 1, 1],
    Ayarlar: [1, 0, 0, 0, 1, 0],
    "Audit Log": [1, 0, 0, 0, 1, 1],
  },
  "Seviye 4 - Tam Yetki": {
    Dashboard: [1, 1, 1, 1, 1, 1],
    Kullanıcılar: [1, 1, 1, 1, 1, 1],
    Roller: [1, 1, 1, 1, 1, 1],
    Raporlar: [1, 1, 1, 1, 1, 1],
    Ayarlar: [1, 1, 1, 1, 1, 1],
    "Audit Log": [1, 1, 1, 1, 1, 1],
  },
};

const levelDetails = {
  "Seviye 1 - Görüntüleme": {
    badge: "Seviye 1",
    className: "badge-muted",
    title: "Görüntüleme Seviyesi",
    copy: "Dashboard ve izin verilen raporları görüntüler; veri değiştirme yetkisi yoktur.",
    summary: "Salt okunur erişim",
  },
  "Seviye 2 - Operasyon": {
    badge: "Seviye 2",
    className: "badge-amber",
    title: "Operasyon Seviyesi",
    copy: "Günlük kullanıcı işlemleri, temel raporlar ve sınırlı kayıt güncelleme.",
    summary: "Operasyonel izinler açık",
  },
  "Seviye 3 - Onay Yetkisi": {
    badge: "Seviye 3",
    className: "badge-blue",
    title: "Onay Seviyesi",
    copy: "Operasyonel işlemleri onaylar, raporları yönetir ve kritik değişiklikleri denetler.",
    summary: "Onay ve denetim izinleri açık",
  },
  "Seviye 4 - Tam Yetki": {
    badge: "Seviye 4",
    className: "badge-green",
    title: "Tam Yetki Seviyesi",
    copy: "Kullanıcı, rol, izin, rapor ve ayar modüllerinde tam kontrol.",
    summary: "Tüm sistem izinleri açık",
  },
};

const users = [
  { id: 1, company: "Nova Teknoloji A.Ş.", name: "Aylin Demir", email: "aylin@ornek.com", role: "Admin", level: "Seviye 4 - Tam Yetki", lastLogin: "Bugün 09:24", status: "active" },
  { id: 2, company: "Nova Teknoloji A.Ş.", name: "Mert Kaya", email: "mert@ornek.com", role: "Operasyon", level: "Seviye 2 - Operasyon", lastLogin: "Bugün 08:41", status: "active" },
  { id: 3, company: "Vera Finans", name: "Selin Arslan", email: "selin@ornek.com", role: "Raporlama", level: "Seviye 2 - Operasyon", lastLogin: "Dün 17:12", status: "active" },
  { id: 4, company: "Mercan Sağlık", name: "Can Yıldız", email: "can@ornek.com", role: "Denetçi", level: "Seviye 3 - Onay Yetkisi", lastLogin: "25 Nis 2026", status: "passive" },
  { id: 5, company: "Atlas Lojistik", name: "Ece Şahin", email: "ece@ornek.com", role: "Operasyon", level: "Seviye 2 - Operasyon", lastLogin: "Bugün 10:06", status: "active" },
  { id: 6, company: "İleri Eğitim", name: "Deniz Kaya", email: "deniz@ornek.com", role: "Raporlama", level: "Seviye 1 - Görüntüleme", lastLogin: "Dün 13:18", status: "active" },
  { id: 7, company: "Orion E-Ticaret", name: "Baran Çelik", email: "baran@ornek.com", role: "Operasyon", level: "Seviye 3 - Onay Yetkisi", lastLogin: "Bugün 11:02", status: "active" },
];

const roles = [
  { name: "Admin", description: "Sistem çapında yönetim ve güvenlik politikaları", users: 4, badge: "badge-green" },
  { name: "Operasyon", description: "Günlük işlem ve sınırlı kayıt yönetimi", users: 38, badge: "badge-blue" },
  { name: "Raporlama", description: "Dashboard, rapor ve dışa aktarma erişimi", users: 22, badge: "badge-amber" },
  { name: "Denetçi", description: "Audit log ve uyum kayıtlarını izleme", users: 6, badge: "badge-muted" },
];

const approvalItems = [
  { id: 1, title: "Finans raporu dışa aktarma izni", requester: "Selin Arslan", module: "Raporlar", priority: "Yüksek", time: "Bugün 10:18", status: "pending" },
  { id: 2, title: "Operasyon rolüne kullanıcı ekleme", requester: "Mert Kaya", module: "Kullanıcılar", priority: "Orta", time: "Bugün 09:42", status: "pending" },
  { id: 3, title: "Lojistik modülü düzenleme izni", requester: "Ece Şahin", module: "Ayarlar", priority: "Orta", time: "Bugün 09:05", status: "pending" },
  { id: 4, title: "Denetçi rolüne audit log erişimi", requester: "Can Yıldız", module: "Audit Log", priority: "Yüksek", time: "Dün 16:31", status: "pending" },
  { id: 5, title: "Yeni departman yöneticisi rolü", requester: "Aylin Demir", module: "Roller", priority: "Yüksek", time: "Dün 15:20", status: "pending" },
  { id: 6, title: "Eğitim modülü görüntüleme erişimi", requester: "Deniz Kaya", module: "Dashboard", priority: "Düşük", time: "Dün 14:11", status: "pending" },
  { id: 7, title: "Toplu kullanıcı içe aktarma izni", requester: "Mert Kaya", module: "Kullanıcılar", priority: "Yüksek", time: "Dün 11:54", status: "pending" },
  { id: 8, title: "Satış raporu onaylama izni", requester: "Selin Arslan", module: "Raporlar", priority: "Orta", time: "30 Nis 2026", status: "pending" },
  { id: 9, title: "Sektör şablonu ayarlama izni", requester: "Ece Şahin", module: "Ayarlar", priority: "Düşük", time: "30 Nis 2026", status: "pending" },
  { id: 10, title: "Pasif kullanıcı yeniden aktifleştirme", requester: "Aylin Demir", module: "Kullanıcılar", priority: "Orta", time: "29 Nis 2026", status: "pending" },
  { id: 11, title: "Özel rapor paylaşım yetkisi", requester: "Selin Arslan", module: "Raporlar", priority: "Düşük", time: "29 Nis 2026", status: "pending" },
  { id: 12, title: "Rol bazlı ayar görüntüleme", requester: "Can Yıldız", module: "Ayarlar", priority: "Orta", time: "28 Nis 2026", status: "pending" },
  { id: 13, title: "Onay akışı yönetme izni", requester: "Aylin Demir", module: "Roller", priority: "Yüksek", time: "28 Nis 2026", status: "pending" },
  { id: 14, title: "Bölgesel dashboard erişimi", requester: "Ece Şahin", module: "Dashboard", priority: "Düşük", time: "27 Nis 2026", status: "pending" },
];

const criticalLogs = [
  { id: 1, title: "Yetkisiz rol silme denemesi", source: "Roller", actor: "Mert Kaya", time: "Bugün 08:57", severity: "Kritik", status: "open" },
  { id: 2, title: "Pasif kullanıcıdan giriş denemesi", source: "Kimlik doğrulama", actor: "Can Yıldız", time: "Dün 22:14", severity: "Kritik", status: "open" },
  { id: 3, title: "IP kısıtlı ağ dışından admin erişimi", source: "Güvenlik", actor: "Bilinmeyen", time: "Dün 21:02", severity: "Kritik", status: "open" },
];

const auditItems = [
  { title: "Admin rolüne dışa aktarma izni eklendi", actor: "Aylin Demir", time: "10:22", type: "İzin değişikliği" },
  { title: "Mert Kaya için Operasyon rolü atandı", actor: "Sistem Yöneticisi", time: "09:48", type: "Rol atama" },
  { title: "Pasif kullanıcı giriş denemesi engellendi", actor: "Can Yıldız", time: "Dün 22:14", type: "Güvenlik" },
  { title: "Finans raporu CSV olarak dışa aktarıldı", actor: "Selin Arslan", time: "Dün 16:02", type: "Rapor" },
];

let selectedLevel = "Seviye 2 - Operasyon";
let userFilter = "all";
let activeApprovalView = "pending";
let nextUserId = users.length + 1;
const companyPermissionState = new Map();

const permissionBody = document.querySelector("#permissionBody");
const userTable = document.querySelector("#userTable");
const roleList = document.querySelector("#roleList");
const approvalList = document.querySelector("#approvalList");
const approvalViewSubtitle = document.querySelector("#approvalViewSubtitle");
const criticalLogList = document.querySelector("#criticalLogList");
const auditList = document.querySelector("#auditList");
const companySelect = document.querySelector("#companySelect");
const companyPicker = document.querySelector(".company-control");
const companyPickerButton = document.querySelector("#companyPickerButton");
const companyPickerMenu = document.querySelector("#companyPickerMenu");
const selectedCompanyLabel = document.querySelector("#selectedCompanyLabel");
const companyOptions = document.querySelector("#companyOptions");
const companyAddForm = document.querySelector("#companyAddForm");
const companyNameInput = document.querySelector("#companyNameInput");
const levelPicker = document.querySelector("#levelPicker");
const levelPickerButton = document.querySelector("#levelPickerButton");
const levelPickerMenu = document.querySelector("#levelPickerMenu");
const selectedLevelLabel = document.querySelector("#selectedLevelLabel");
const globalSearchForm = document.querySelector("#globalSearchForm");
const globalSearch = document.querySelector("#globalSearch");
const searchNotice = document.querySelector("#searchNotice");
const searchNoticeText = document.querySelector("#searchNoticeText");
const closeSearchNotice = document.querySelector("#closeSearchNotice");
const modal = document.querySelector("#userModal");
const userForm = document.querySelector("#userForm");
const userFormNotice = document.querySelector("#userFormNotice");
const newUserCompany = document.querySelector("#newUserCompany");
const newUserStatus = document.querySelector("#newUserStatus");
const companyDeleteModal = document.querySelector("#companyDeleteModal");
const companyDeleteTitle = document.querySelector("#companyDeleteTitle");
const companyDeleteCopy = document.querySelector("#companyDeleteCopy");
const closeCompanyDeleteButton = document.querySelector("#closeCompanyDeleteModal");
const cancelCompanyDeleteButton = document.querySelector("#cancelCompanyDelete");
const confirmCompanyDeleteButton = document.querySelector("#confirmCompanyDelete");
const companyNames = Array.from(companySelect.options).map((option) => option.value);
let selectedCompany = companySelect.value;
let pendingCompanyDelete = null;

function normalizeSearch(value) {
  return value.trim().toLocaleLowerCase("tr-TR");
}

function hideSearchNotice() {
  searchNotice.hidden = true;
}

function showSearchNotice(message) {
  searchNoticeText.textContent = message;
  searchNotice.hidden = false;
}

function renderCompanyOptions(preferredCompany = selectedCompany, preferredFormCompany = preferredCompany) {
  companySelect.replaceChildren(...companyNames.map((company) => new Option(company, company)));
  newUserCompany.replaceChildren(...companyNames.map((company) => new Option(company, company)));

  selectedCompany = companyNames.includes(preferredCompany) ? preferredCompany : companyNames[0];
  companySelect.value = selectedCompany;
  newUserCompany.value = companyNames.includes(preferredFormCompany) ? preferredFormCompany : selectedCompany;
  selectedCompanyLabel.textContent = selectedCompany;
  companyOptions.replaceChildren(
    ...companyNames.map((company) => {
      const row = document.createElement("div");
      row.className = "company-option-row";

      const option = document.createElement("button");
      option.className = `company-option ${company === selectedCompany ? "is-active" : ""}`;
      option.type = "button";
      option.setAttribute("role", "menuitem");
      option.dataset.companyOption = company;
      option.textContent = company;

      const deleteButton = document.createElement("button");
      deleteButton.className = "company-delete-button";
      deleteButton.type = "button";
      deleteButton.dataset.companyDelete = company;
      deleteButton.setAttribute("aria-label", `${company} firmasını sil`);
      deleteButton.title = companyNames.length === 1 ? "Son firma silinemez" : "Firmayı sil";
      deleteButton.disabled = companyNames.length === 1;
      deleteButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM7 9h2v9h8V9h2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z" /></svg>';

      row.append(option, deleteButton);
      return row;
    }),
  );
}

function closeCompanyPicker() {
  companyPickerMenu.hidden = true;
  companyPickerButton.setAttribute("aria-expanded", "false");
}

function toggleCompanyPicker() {
  const willOpen = companyPickerMenu.hidden;
  companyPickerMenu.hidden = !willOpen;
  companyPickerButton.setAttribute("aria-expanded", String(willOpen));
}

function selectCompany(company, formCompany = company) {
  renderCompanyOptions(company, formCompany);
  closeCompanyPicker();
  closeLevelPicker();
  renderPermissions();
  renderUsers();
}

function openCompanyDeleteModal(company) {
  if (companyNames.length === 1) return;

  const userCount = users.filter((user) => user.company === company).length;
  pendingCompanyDelete = company;
  closeCompanyPicker();
  companyDeleteTitle.textContent = `${company} silinsin mi?`;
  companyDeleteCopy.textContent = userCount
    ? `Bu firmaya bağlı ${userCount} kullanıcı ve firmaya özel izin ayarları kaldırılacak. Bu işlem prototip içinde geri alınamaz.`
    : "Bu firmaya bağlı kullanıcı yok. Firmaya özel izin ayarları kaldırılacak.";
  companyDeleteModal.classList.add("is-open");
  companyDeleteModal.setAttribute("aria-hidden", "false");
  cancelCompanyDeleteButton.focus();
}

function closeCompanyDeleteModal() {
  pendingCompanyDelete = null;
  companyDeleteModal.classList.remove("is-open");
  companyDeleteModal.setAttribute("aria-hidden", "true");
}

function deletePendingCompany() {
  if (!pendingCompanyDelete || companyNames.length === 1) return;

  const deletedCompany = pendingCompanyDelete;
  const companyIndex = companyNames.indexOf(deletedCompany);
  if (companyIndex === -1) {
    closeCompanyDeleteModal();
    return;
  }

  companyNames.splice(companyIndex, 1);
  for (let index = users.length - 1; index >= 0; index -= 1) {
    if (users[index].company === deletedCompany) {
      users.splice(index, 1);
    }
  }
  companyPermissionState.delete(deletedCompany);

  const nextCompany = selectedCompany === deletedCompany ? companyNames[Math.max(0, companyIndex - 1)] : selectedCompany;
  closeCompanyDeleteModal();
  selectCompany(nextCompany);
}

function hideUserFormNotice() {
  userFormNotice.hidden = true;
}

function showUserFormNotice(message) {
  userFormNotice.textContent = message;
  userFormNotice.hidden = false;
}

function updateStatusSwitchText(input) {
  const text = input.closest(".status-switch")?.querySelector(".status-switch-text");
  if (!text) return;

  text.textContent = input.checked ? "Aktif" : "Pasif";
  text.classList.toggle("passive", !input.checked);
}

function renderActiveUserMetric() {
  const activeUsers = document.querySelector("#activeUsers");
  activeUsers.textContent = String(users.filter((user) => user.company === selectedCompany && user.status === "active").length);
}

function levelBadgeClass(level) {
  if (level.includes("Seviye 4")) return "badge-green";
  if (level.includes("Seviye 3")) return "badge-blue";
  if (level.includes("Seviye 2")) return "badge-amber";
  return "badge-muted";
}

function updateReviewMetrics() {
  const pendingCount = approvalItems.filter((item) => item.status === "pending").length;
  const approvedCount = approvalItems.filter((item) => item.status === "approved").length;
  const rejectedCount = approvalItems.filter((item) => item.status === "rejected").length;
  document.querySelector("#approvalCount").textContent = String(pendingCount);
  document.querySelector("#approvalPendingCount").textContent = String(pendingCount);
  document.querySelector("#approvalApprovedCount").textContent = String(approvedCount);
  document.querySelector("#approvalRejectedCount").textContent = String(rejectedCount);
  document.querySelector("#criticalCount").textContent = String(criticalLogs.filter((item) => item.status === "open").length);
}

function clonePermissionState() {
  return Object.fromEntries(
    Object.entries(defaultPermissionState).map(([level, modulePermissions]) => [
      level,
      Object.fromEntries(
        Object.entries(modulePermissions).map(([moduleName, values]) => [moduleName, [...values]]),
      ),
    ]),
  );
}

function getCurrentCompanyPermissions() {
  if (!companyPermissionState.has(selectedCompany)) {
    companyPermissionState.set(selectedCompany, clonePermissionState());
  }

  return companyPermissionState.get(selectedCompany);
}

function closeLevelPicker() {
  levelPickerMenu.hidden = true;
  levelPickerButton.setAttribute("aria-expanded", "false");
}

function toggleLevelPicker() {
  const willOpen = levelPickerMenu.hidden;
  levelPickerMenu.hidden = !willOpen;
  levelPickerButton.setAttribute("aria-expanded", String(willOpen));
}

function updateLevelPicker() {
  selectedLevelLabel.textContent = selectedLevel;
  document.querySelectorAll("[data-level-option]").forEach((option) => {
    option.classList.toggle("is-active", option.dataset.levelOption === selectedLevel);
  });
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function updateLevelSummary() {
  const permissions = getCurrentCompanyPermissions();
  const values = modules.flatMap((moduleName) => permissions[selectedLevel][moduleName]);
  const enabled = values.filter(Boolean).length;
  const coverage = Math.round((enabled / values.length) * 100);
  const detail = levelDetails[selectedLevel];

  document.querySelector("#matrixSubtitle").textContent = `${selectedCompany} - ${selectedLevel} için modül bazlı izinler`;
  document.querySelector("#levelSummary").textContent = detail.summary;
  document.querySelector("#levelBadge").textContent = detail.badge;
  document.querySelector("#levelBadge").className = `badge ${detail.className}`;
  document.querySelector("#levelTitle").textContent = detail.title;
  document.querySelector("#levelCopy").textContent = detail.copy;
  document.querySelector("#coverageValue").textContent = `${coverage}%`;
  document.querySelector("#coverageBar").style.width = `${coverage}%`;
  updateLevelPicker();
}

function renderPermissions() {
  const permissions = getCurrentCompanyPermissions();

  permissionBody.innerHTML = modules
    .map((moduleName, moduleIndex) => {
      const cells = actions
        .map((action, actionIndex) => {
          const checked = permissions[selectedLevel][moduleName][actionIndex] ? "checked" : "";
          const label = `${selectedCompany} ${selectedLevel} ${moduleName} ${action}`;
          return `
            <td>
              <label class="permission-toggle" title="${label}">
                <input type="checkbox" ${checked} data-module="${moduleName}" data-action-index="${actionIndex}" />
                <span></span>
              </label>
            </td>
          `;
        })
        .join("");

      return `
        <tr>
          <td>
            <span class="module-name">
              <span class="module-dot" style="background: ${moduleIndex % 2 === 0 ? "#087c73" : "#2868b2"}"></span>
              ${moduleName}
            </span>
          </td>
          ${cells}
        </tr>
      `;
    })
    .join("");

  updateLevelSummary();
}

function renderUsers() {
  const query = normalizeSearch(globalSearch.value);
  const visibleUsers = users.filter((user) => {
    const matchesCompany = user.company === selectedCompany;
    const matchesFilter = userFilter === "all" || user.status === userFilter;
    const matchesQuery = [user.name, user.email, user.role, user.level]
      .join(" ")
      .toLocaleLowerCase("tr-TR")
      .includes(query);
    return matchesCompany && matchesFilter && matchesQuery;
  });

  renderActiveUserMetric();

  if (!visibleUsers.length) {
    userTable.innerHTML = `
      <tr>
        <td class="empty-row" colspan="5">Bu firmada seçili filtreye uygun kullanıcı bulunamadı.</td>
      </tr>
    `;
    return;
  }

  userTable.innerHTML = visibleUsers
    .map((user) => {
      const statusText = user.status === "active" ? "Aktif" : "Pasif";
      const checked = user.status === "active" ? "checked" : "";
      return `
        <tr>
          <td>
            <div class="user-cell">
              <span class="user-initials">${initials(user.name)}</span>
              <span>
                <strong>${user.name}</strong>
                <small>${user.email}</small>
              </span>
            </div>
          </td>
          <td>${user.role}</td>
          <td><span class="badge ${levelBadgeClass(user.level)}">${user.level}</span></td>
          <td>${user.lastLogin}</td>
          <td>
            <label class="status-switch" title="${user.name} durumunu değiştir">
              <input class="user-status-input" type="checkbox" data-user-id="${user.id}" ${checked} aria-label="${user.name} aktif pasif durumu" />
              <span class="status-switch-track"></span>
              <span class="status-switch-text ${user.status === "passive" ? "passive" : ""}">${statusText}</span>
            </label>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderRoles() {
  const query = normalizeSearch(globalSearch.value);
  roleList.innerHTML = roles
    .map((role) => {
      const isHighlighted = query && normalizeSearch(`${role.name} ${role.description}`).includes(query);
      return `
      <button class="role-list-item ${isHighlighted ? "is-highlighted" : ""}" type="button" data-role="${role.name}">
        <span>
          <span class="badge ${role.badge}">${role.name}</span>
          <strong>${role.description}</strong>
          <small>${role.users} kullanıcı bağlı</small>
        </span>
        <span class="role-count">${role.users}</span>
      </button>
    `;
    })
    .join("");
}

function renderApprovals() {
  const subtitles = {
    pending: "Bekleyen yetki talepleri ve kritik işlem onayları",
    approved: "Onaylanmış yetki talepleri ve tamamlanan onaylar",
    rejected: "Reddedilmiş talepler ve kapatılan onay istekleri",
  };
  const emptyTexts = {
    pending: "Bekleyen onay bulunmuyor.",
    approved: "Henüz onaylanan kayıt yok.",
    rejected: "Henüz reddedilen kayıt yok.",
  };
  const visibleApprovals = approvalItems.filter((item) => item.status === activeApprovalView);

  approvalViewSubtitle.textContent = subtitles[activeApprovalView];
  document.querySelectorAll("[data-approval-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.approvalView === activeApprovalView);
  });

  if (!visibleApprovals.length) {
    approvalList.innerHTML = `<div class="review-empty">${emptyTexts[activeApprovalView]}</div>`;
    updateReviewMetrics();
    return;
  }

  approvalList.innerHTML = visibleApprovals
    .map((item) => {
      const isPending = item.status === "pending";
      const statusText = isPending ? "Bekliyor" : item.status === "approved" ? "Onaylandı" : "Reddedildi";
      const statusClass = isPending ? "badge-amber" : item.status === "approved" ? "badge-green" : "badge-rose";
      const actions = isPending
        ? `
        <div class="review-actions">
          <button class="tiny-button" type="button" data-approval-action="approved" data-id="${item.id}">Onayla</button>
          <button class="tiny-button danger" type="button" data-approval-action="rejected" data-id="${item.id}">Reddet</button>
        </div>
      `
        : "";
      return `
      <article class="review-item ${isPending ? "" : "is-done"}">
        <div>
          <div class="review-title">
            <span class="badge ${statusClass}">${statusText}</span>
            <strong>${item.title}</strong>
          </div>
          <p>${item.requester} tarafından ${item.module} modülü için talep edildi.</p>
          <div class="review-meta">
            <span class="badge badge-muted">${item.priority} öncelik</span>
            <span class="badge badge-muted">${item.time}</span>
          </div>
        </div>
        ${actions}
      </article>
    `;
    })
    .join("");
  updateReviewMetrics();
}

function renderCriticalLogs() {
  criticalLogList.innerHTML = criticalLogs
    .map((item) => {
      const isOpen = item.status === "open";
      return `
      <article class="review-item ${isOpen ? "" : "is-done"}">
        <div>
          <div class="review-title">
            <span class="badge ${isOpen ? "badge-rose" : "badge-green"}">${isOpen ? item.severity : "Çözüldü"}</span>
            <strong>${item.title}</strong>
          </div>
          <p>${item.actor} hesabı veya kaynağı üzerinden ${item.source} alanında oluştu.</p>
          <div class="review-meta">
            <span class="badge badge-muted">${item.source}</span>
            <span class="badge badge-muted">${item.time}</span>
          </div>
        </div>
        <div class="review-actions">
          <button class="tiny-button" type="button" data-critical-action="resolved" data-id="${item.id}" ${isOpen ? "" : "disabled"}>Çözüldü</button>
        </div>
      </article>
    `;
    })
    .join("");
  updateReviewMetrics();
}

function renderAudit() {
  auditList.innerHTML = auditItems
    .map(
      (item) => `
      <article class="audit-item">
        <div>
          <span class="badge badge-muted">${item.type}</span>
          <strong>${item.title}</strong>
          <small>${item.actor}</small>
        </div>
        <div class="audit-meta">${item.time}</div>
      </article>
    `,
    )
    .join("");
}

function switchView(view) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((panel) => {
    panel.classList.toggle("is-visible", panel.dataset.viewPanel === view);
  });
}

function resetUserStatusFilter() {
  userFilter = "all";
  document.querySelectorAll(".segmented button").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.filter === "all");
  });
}

function runGlobalSearch() {
  const query = normalizeSearch(globalSearch.value);
  if (!query) return;

  const matchedUser = users.find((user) =>
    user.company === selectedCompany && normalizeSearch(`${user.name} ${user.email} ${user.level}`).includes(query),
  );

  if (matchedUser) {
    resetUserStatusFilter();
    switchView("users");
    renderUsers();
    hideSearchNotice();
    return;
  }

  const matchedRole = roles.find((role) => normalizeSearch(`${role.name} ${role.description}`).includes(query));

  if (matchedRole) {
    switchView("roles");
    renderRoles();
    hideSearchNotice();
    return;
  }

  showSearchNotice("Seçili firmada kullanıcı veya rol bulunamadı.");
}

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => switchView(item.dataset.view));
});

document.querySelectorAll(".metric-button[data-view], .secondary-button[data-view]").forEach((item) => {
  item.addEventListener("click", () => switchView(item.dataset.view));
});

levelPickerButton.addEventListener("click", toggleLevelPicker);

levelPickerMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-level-option]");
  if (!option) return;

  selectedLevel = option.dataset.levelOption;
  closeLevelPicker();
  renderPermissions();
});

document.addEventListener("click", (event) => {
  if (!levelPicker.contains(event.target)) {
    closeLevelPicker();
  }
  if (!companyPicker.contains(event.target)) {
    closeCompanyPicker();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLevelPicker();
    closeCompanyPicker();
    closeCompanyDeleteModal();
  }
});

permissionBody.addEventListener("change", (event) => {
  const target = event.target;
  if (!target.matches("input[type='checkbox']")) return;

  const moduleName = target.dataset.module;
  const actionIndex = Number(target.dataset.actionIndex);
  getCurrentCompanyPermissions()[selectedLevel][moduleName][actionIndex] = target.checked ? 1 : 0;
  updateLevelSummary();
});

companyPickerButton.addEventListener("click", toggleCompanyPicker);

companyOptions.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("[data-company-delete]");
  if (deleteButton) {
    openCompanyDeleteModal(deleteButton.dataset.companyDelete);
    return;
  }

  const option = event.target.closest("[data-company-option]");
  if (!option) return;

  selectCompany(option.dataset.companyOption);
});

closeCompanyDeleteButton.addEventListener("click", closeCompanyDeleteModal);
cancelCompanyDeleteButton.addEventListener("click", closeCompanyDeleteModal);
confirmCompanyDeleteButton.addEventListener("click", deletePendingCompany);

companyDeleteModal.addEventListener("click", (event) => {
  if (event.target === companyDeleteModal) closeCompanyDeleteModal();
});

companyAddForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const companyName = companyNameInput.value.trim();
  if (!companyName) return;

  const alreadyExists = companyNames.some((company) => normalizeSearch(company) === normalizeSearch(companyName));
  if (alreadyExists) {
    companyNameInput.setCustomValidity("Bu firma zaten listede.");
    companyNameInput.reportValidity();
    return;
  }

  companyNameInput.setCustomValidity("");
  companyNames.push(companyName);
  companyNameInput.value = "";
  selectCompany(companyName, companyName);
});

companyNameInput.addEventListener("input", () => {
  companyNameInput.setCustomValidity("");
});

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    userFilter = button.dataset.filter;
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.toggle("is-active", item === button));
    renderUsers();
  });
});

userTable.addEventListener("change", (event) => {
  const target = event.target;
  if (!target.matches(".user-status-input")) return;

  const user = users.find((item) => item.id === Number(target.dataset.userId));
  if (!user) return;

  user.status = target.checked ? "active" : "passive";
  renderUsers();
});

approvalList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-approval-action]");
  if (!button) return;

  const item = approvalItems.find((approval) => approval.id === Number(button.dataset.id));
  if (!item || item.status !== "pending") return;

  item.status = button.dataset.approvalAction;
  renderApprovals();
});

document.querySelectorAll("[data-approval-view]").forEach((button) => {
  button.addEventListener("click", () => {
    activeApprovalView = button.dataset.approvalView;
    renderApprovals();
  });
});

criticalLogList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-critical-action]");
  if (!button) return;

  const item = criticalLogs.find((log) => log.id === Number(button.dataset.id));
  if (!item || item.status !== "open") return;

  item.status = "resolved";
  renderCriticalLogs();
});

globalSearch.addEventListener("input", () => {
  hideSearchNotice();
  renderUsers();
  renderRoles();
});

closeSearchNotice.addEventListener("click", hideSearchNotice);

globalSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runGlobalSearch();
});

globalSearch.addEventListener("search", runGlobalSearch);

roleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) return;

  globalSearch.value = button.dataset.role;
  resetUserStatusFilter();
  switchView("users");
  renderUsers();
  hideSearchNotice();
});

document.querySelector("#addRoleButton").addEventListener("click", () => {
  switchView("dashboard");
});

document.querySelector("#openUserModal").addEventListener("click", () => {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  hideUserFormNotice();
  newUserCompany.value = selectedCompany;
  userForm.elements.name.focus();
});

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  userForm.reset();
  hideUserFormNotice();
  newUserCompany.value = selectedCompany;
  newUserStatus.checked = true;
  updateStatusSwitchText(newUserStatus);
}

document.querySelector("#closeUserModal").addEventListener("click", closeModal);
document.querySelector("#cancelUserModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(userForm);
  const isActive = newUserStatus.checked;
  const email = String(data.get("email")).trim();
  const company = String(data.get("company"));
  const existingUser = users.find((user) => normalizeSearch(user.email) === normalizeSearch(email));

  if (existingUser) {
    showUserFormNotice(`${email} zaten ${existingUser.company} firmasında kayıtlı.`);
    return;
  }

  users.unshift({
    id: nextUserId,
    company,
    name: data.get("name"),
    email,
    role: data.get("role"),
    level: data.get("level"),
    lastLogin: "Henüz giriş yok",
    status: isActive ? "active" : "passive",
  });
  nextUserId += 1;
  renderCompanyOptions(company, company);
  closeCompanyPicker();
  renderPermissions();
  renderUsers();
  closeModal();
});

userForm.addEventListener("input", hideUserFormNotice);
userForm.addEventListener("change", hideUserFormNotice);

newUserStatus.addEventListener("change", () => updateStatusSwitchText(newUserStatus));

renderCompanyOptions();
renderPermissions();
renderUsers();
renderRoles();
renderApprovals();
renderCriticalLogs();
renderAudit();
