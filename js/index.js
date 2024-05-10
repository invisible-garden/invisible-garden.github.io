const {createApp, ref, reactive, computed, onBeforeUnmount} = Vue

createApp({
    setup() {

        // ---------------- 语言配置 ------------------
        const langConfig = reactive({
            // 设置默认语言：0=英文，1=泰文，2=中文， 对应 list中的index值
            selectIndex: 0,
            // 自动切换间隔（秒）
            interval: 5,
            // 语言列表
            list: [
                {
                    index: 0,
                    lang: "English",
                    langName: "英文",
                },
                {
                    index: 1,
                    lang: "Thailand",
                    langName: "泰文",
                },
                {
                    index: 2,
                    lang: "Chinese",
                    langName: "中文",
                },
            ]
        })

        // ---------------- 配置页面内容 ------------------
        const contentList = ref([
            {
                lang: langConfig.list[0].lang,                  // 当前语言英文名
                langName: langConfig.list[0].langName,          // 当前语言中文名
                title: `Invisible Garden`,                      // 浏览器显示的标题
                content: `Ethereum and ZKP dev city #0`,        // 内容
                location: `Chiang Mai`,                         // 地址
                time: `30th Sep - 10th Nov 2024`,               // 时间
                buttonText: `Get more info`,                // 按钮文本
                buttonLink: `https://t.me/invgarannounce/`,     // 按钮链接
            }, {
                lang: langConfig.list[1].lang,
                langName: langConfig.list[1].langName,
                title: `Invisible Garden`,
                content: `Ethereum and ZKP dev city #0`,
                location: `เชียงใหม่`,
                time: `30 ก.ย. - 10 พ.ย. 2567`,
                buttonText: `รับข้อมูลเพิ่มเติม`,
                buttonLink: `https://t.me/invgarannounce/`,
            },
            {
                lang: langConfig.list[2].lang,
                langName: langConfig.list[2].langName,
                title: `Invisible Garden`,
                content: `以太坊和零知识证明开发者之城#0`,
                location: `清迈`,
                time: `2024年9月30号 - 11月10号`,
                buttonText: `获取更多信息`,
                buttonLink: `https://t.me/invgarannounce/`,
            },
        ])

        // ---------------- 以下为切换语言逻辑 ------------------
        const currentPageContent = computed(() => {
            return contentList.value[langConfig.selectIndex]
        })
        clearInterval(window.__timer)
        window.__timer = setInterval(() => {
            if (langConfig.selectIndex >= contentList.value.length - 1) {
                langConfig.selectIndex = 0
            } else {
                langConfig.selectIndex += 1
            }
            document.title = contentList.value[langConfig.selectIndex].title
        }, langConfig.interval * 1000)

        const handleToggleLang = (index) => {
            clearInterval(window.__timer)
            langConfig.selectIndex = index;
            document.title = contentList.value[langConfig.selectIndex].title
        }
        onBeforeUnmount(() => {
            clearInterval(window.__timer)
        })
        return {langConfig, currentPageContent, handleToggleLang}
    }
}).mount('#app')
