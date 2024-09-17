const Merit = () => {
  const meritArr = [
    {
      id: 1,
      title: "효율성 증대",
      description:
        "시간과 장소에 구애받지 않는 실시간 정보 공유와 관리를 가능하게 하여, 고객 서비스의 질을 한 단계 끌어올립니다.",
    },
    {
      id: 2,
      title: "고객관리 편의성",
      description:
        "상담내역과 중개업무 중 필요한 메모를 실시간으로 관리할 수 있어서 고객과의 지속적이고 효과적인 소통을 가능하게 하여, 고객 만족도를 대폭 향상시킵니다.",
    },
    {
      id: 3,
      title: "검색 편의성",
      description:
        "엑셀이나 종이에 적은 상담 관련 내용은 쌓이면 금방 가독성이 떨어집니다. 하지만 중개랜드의 서비스는 내역이 쌓여도 이런 점을 걱정하실 필요가 없습니다.",
    },
  ];
  
  return (
    <div className="grid grid-cols-1 gap-5 px-4 lg:grid-cols-3 lg:px-0">
      {meritArr.map((item) => (
        <div key={item.id} className="flex flex-col space-y-5 rounded-xl bg-slate-200 px-4 py-7 shadow-sm">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <p className="leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Merit;
